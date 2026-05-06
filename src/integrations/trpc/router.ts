import { agentsRouter } from '#/features/agents/utils/router'
import { meetingsRouter } from '#/features/meetings/utils/router'
import { createTRPCRouter } from './init'
import type { inferRouterOutputs } from '@trpc/server'

export const trpcRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
})

export type TRPCRouter = typeof trpcRouter
export type AgentGetOne = inferRouterOutputs<TRPCRouter>['agents']['getOne']
export type MeetingGetOne = inferRouterOutputs<TRPCRouter>['meetings']['getOne']
