import { createTRPCRouter, protectedProcedure } from './init'
import type { inferRouterOutputs, TRPCRouterRecord } from '@trpc/server'
import {
  createAgentFn,
  deleteAgentFn,
  getManyAgentsFn,
  getOneAgentFn,
  updateAgentFn,
} from '#/features/agents/utils/function'
import {
  agentsDeleteSchema,
  agentsGetManySchema,
  agentsGetOneSchema,
  agentsInsertSchema,
  agentsUpdateSchema,
} from '#/features/agents/utils/schema'

const agentsRouter = {
  getMany: protectedProcedure
    .input(agentsGetManySchema)
    .query(({ input }) => getManyAgentsFn({ data: input })),
  getOne: protectedProcedure
    .input(agentsGetOneSchema)
    .query(({ input }) => getOneAgentFn({ data: input })),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(({ input }) => createAgentFn({ data: input })),
  update: protectedProcedure
    .input(agentsUpdateSchema)
    .mutation(({ input }) => updateAgentFn({ data: input })),
  delete: protectedProcedure
    .input(agentsDeleteSchema)
    .mutation(({ input }) => deleteAgentFn({ data: input })),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  agents: agentsRouter,
})

export type TRPCRouter = typeof trpcRouter
export type AgentGetOne = inferRouterOutputs<TRPCRouter>['agents']['getOne']
