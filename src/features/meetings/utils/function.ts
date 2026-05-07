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

export const getManyMeetingsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .inputValidator(meetingsGetManySchema)
  .handler(async ({ data, context }) => {
    const { search, page, pageSize } = data

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
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, data.id), eq(meetings.userId, context.session.user.id)))

    if (!meeting) throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' })

    return meeting
  })

export const createMeetingFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(meetingsInsertSchema)
  .handler(async ({ data, context }) => {
    console.log(data, context)

    const [newMeeting] = await db
      .insert(meetings)
      .values({ ...data, userId: context.session.user.id })
      .returning()

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
