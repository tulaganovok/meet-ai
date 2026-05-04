import { auth } from '#/lib/auth'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

export type TRPCContext = {
  headers: Headers
}

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: ctx.headers })

  if (!session) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' })

  return next({ ctx: { ...ctx, auth: session } })
})
