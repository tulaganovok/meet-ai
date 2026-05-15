import { db } from '#/db/index'
import { agents, meetings } from '#/db/schema'
import { authFnMiddleware } from '#/middleware/auth'
import { createServerFn } from '@tanstack/react-start'
import {
  meetingsDeleteSchema,
  meetingsGetManySchema,
  meetingsGetOneSchema,
  meetingsInsertSchema,
  meetingsUpdateSchema,
} from './schema'
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { streamClient } from '#/lib/stream'
import { generateAvatarUrl } from '#/lib/utils'

export const getManyMeetingsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .inputValidator(meetingsGetManySchema)
  .handler(async ({ data, context }) => {
    const { search, page, pageSize, agentId, status } = data

    const filteredMeetings = await db
      .select({
        ...getTableColumns(meetings),
        agent: agents,
        duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as('duration'),
      })
      .from(meetings)
      .innerJoin(agents, eq(meetings.agentId, agents.id))
      .where(
        and(
          eq(meetings.userId, context.session.user.id),
          search ? ilike(meetings.name, `%${search}%`) : undefined,
          agentId ? eq(meetings.agentId, agentId) : undefined,
          status ? eq(meetings.status, status) : undefined,
        ),
      )
      .orderBy(desc(meetings.createdAt), desc(meetings.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)

    const [totalMeetings] = await db
      .select({ count: count() })
      .from(meetings)
      .innerJoin(agents, eq(meetings.agentId, agents.id))
      .where(
        and(
          eq(meetings.userId, context.session.user.id),
          search ? ilike(meetings.name, `%${search}%`) : undefined,
          agentId ? eq(meetings.agentId, agentId) : undefined,
          status ? eq(meetings.status, status) : undefined,
        ),
      )

    const totalMeetingsPages = Math.ceil(totalMeetings.count / pageSize)

    return {
      meetings: filteredMeetings,
      total: totalMeetings.count,
      totalPages: totalMeetingsPages,
    }
  })

export const getOneMeetingFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .inputValidator(meetingsGetOneSchema)
  .handler(async ({ data, context }) => {
    const [meeting] = await db
      .select({
        ...getTableColumns(meetings),
        agent: agents,
        duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as('duration'),
      })
      .from(meetings)
      .innerJoin(agents, eq(meetings.agentId, agents.id))
      .where(and(eq(meetings.id, data.id), eq(meetings.userId, context.session.user.id)))

    if (!meeting) throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' })

    return meeting
  })

export const createMeetingFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(meetingsInsertSchema)
  .handler(async ({ data, context }) => {
    const { id } = context.session.user

    const [newMeeting] = await db
      .insert(meetings)
      .values({ ...data, userId: id })
      .returning()

    const newCall = streamClient.video.call('default', newMeeting.id)

    await newCall.create({
      data: {
        created_by_id: id,
        custom: { meetingId: newMeeting.id, meetingName: newMeeting.name },
        settings_override: {
          transcription: { language: 'en', mode: 'auto-on', closed_caption_mode: 'auto-on' },
          recording: { mode: 'auto-on', quality: '1080p' },
        },
      },
    })

    const [existingAgent] = await db.select().from(agents).where(eq(agents.id, newMeeting.agentId))

    await streamClient.upsertUsers([
      {
        id: existingAgent.id,
        name: existingAgent.name,
        role: 'user',
        image: generateAvatarUrl({ seed: existingAgent.name, variant: 'botttsNeutral' }),
      },
    ])

    return newMeeting
  })

export const updateMeetingFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(meetingsUpdateSchema)
  .handler(async ({ data, context }) => {
    const { id, ...values } = data

    const [updatedMeeting] = await db
      .update(meetings)
      .set(values)
      .where(and(eq(meetings.id, id), eq(meetings.userId, context.session.user.id)))
      .returning()

    if (!updatedMeeting) throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' })

    return updatedMeeting
  })

export const deleteMeetingFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(meetingsDeleteSchema)
  .handler(async ({ data, context }) => {
    const [deletedMeeting] = await db
      .delete(meetings)
      .where(and(eq(meetings.id, data.id), eq(meetings.userId, context.session.user.id)))
      .returning()

    if (!deletedMeeting) throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' })

    return deletedMeeting
  })

export const generateStreamUserTokenFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .handler(async ({ context }) => {
    const { id, name, image } = context.session.user
    const currentUserImage = image ?? generateAvatarUrl({ variant: 'initials', seed: name })

    await streamClient.upsertUsers([{ id, name, role: 'admin', image: currentUserImage }])

    const now = Math.floor(Date.now() / 1000)
    const streamUserToken = streamClient.generateUserToken({
      user_id: id,
      iat: now - 60,
      exp: now + 60 * 60,
    })

    return streamUserToken
  })
