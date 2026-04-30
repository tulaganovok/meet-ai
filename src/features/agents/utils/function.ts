import { db } from '#/db/index'
import { agents } from '#/db/schema'
import { authFnMiddleware } from '#/middleware/auth'
import { createServerFn } from '@tanstack/react-start'
import { agentsGetOneSchema, agentsInsertSchema } from './schema'
import { eq } from 'drizzle-orm'

export const getAllAgentsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .handler(async () => {
    const allAgents = await db.select().from(agents)
    return allAgents
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
