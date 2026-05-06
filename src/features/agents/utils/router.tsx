import { protectedProcedure } from '#/integrations/trpc/init'
import type { TRPCRouterRecord } from '@trpc/server'
import {
  createAgentFn,
  deleteAgentFn,
  getManyAgentsFn,
  getOneAgentFn,
  updateAgentFn,
} from './function'
import {
  agentsDeleteSchema,
  agentsGetManySchema,
  agentsGetOneSchema,
  agentsInsertSchema,
  agentsUpdateSchema,
} from './schema'

export const agentsRouter = {
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
