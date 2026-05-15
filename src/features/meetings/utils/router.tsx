import { protectedProcedure } from '#/integrations/trpc/init'
import type { TRPCRouterRecord } from '@trpc/server'
import {
  createMeetingFn,
  deleteMeetingFn,
  generateStreamUserTokenFn,
  getManyMeetingsFn,
  getOneMeetingFn,
  updateMeetingFn,
} from './function'
import {
  meetingsDeleteSchema,
  meetingsGetManySchema,
  meetingsGetOneSchema,
  meetingsInsertSchema,
  meetingsUpdateSchema,
} from './schema'

export const meetingsRouter = {
  getMany: protectedProcedure
    .input(meetingsGetManySchema)
    .query(({ input }) => getManyMeetingsFn({ data: input })),
  getOne: protectedProcedure
    .input(meetingsGetOneSchema)
    .query(({ input }) => getOneMeetingFn({ data: input })),
  create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(({ input }) => createMeetingFn({ data: input })),
  update: protectedProcedure
    .input(meetingsUpdateSchema)
    .mutation(({ input }) => updateMeetingFn({ data: input })),
  delete: protectedProcedure
    .input(meetingsDeleteSchema)
    .mutation(({ input }) => deleteMeetingFn({ data: input })),
  generateStreamUserToken: protectedProcedure.mutation(() => generateStreamUserTokenFn()),
} satisfies TRPCRouterRecord
