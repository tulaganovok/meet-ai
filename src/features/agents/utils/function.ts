import { db } from '#/db/index'
import { agents } from '#/db/schema'
import { authFnMiddleware } from '#/middleware/auth'
import { createServerFn } from '@tanstack/react-start'
import { agentsGetManySchema, agentsGetOneSchema, agentsInsertSchema } from './schema'
import { and, count, desc, eq, ilike } from 'drizzle-orm'

export const getManyAgentsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .inputValidator(agentsGetManySchema)
  .handler(async ({ data, context }) => {
    const { search, page, pageSize } = data

    const filteredAgents = await db
      .select()
      .from(agents)
      .where(
        and(
          eq(agents.userId, context.session.user.id),
          search ? ilike(agents.name, `%${search}%`) : undefined,
        ),
      )
      .orderBy(desc(agents.createdAt), desc(agents.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)

    const [totalAgents] = await db
      .select({ count: count() })
      .from(agents)
      .where(
        and(
          eq(agents.userId, context.session.user.id),
          search ? ilike(agents.name, `%${search}%`) : undefined,
        ),
      )

    const totalAgentsPages = Math.ceil(totalAgents.count / pageSize)

    return { agents: filteredAgents, total: totalAgents.count, totalPages: totalAgentsPages }
  })

export const getOneAgentFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .inputValidator(agentsGetOneSchema)
  .handler(async ({ data }) => {
    const [agent] = await db.select().from(agents).where(eq(agents.id, data.id))
    return agent
  })

export const createAgentFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(agentsInsertSchema)
  .handler(async ({ data, context }) => {
    const [newAgent] = await db
      .insert(agents)
      .values({ ...data, userId: context.session.user.id })
      .returning()

    return newAgent
  })
