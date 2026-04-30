import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from './init'

import type { inferRouterOutputs, TRPCRouterRecord } from '@trpc/server'
import { createAgentFn, getAllAgentsFn, getOneAgentFn } from '#/features/agents/utils/function'
import { agentsGetOneSchema, agentsInsertSchema } from '#/features/agents/utils/schema'

const todos = [
  { id: 1, name: 'Get groceries' },
  { id: 2, name: 'Buy a new phone' },
  { id: 3, name: 'Finish the project' },
]

const todosRouter = {
  list: publicProcedure.query(() => todos),
  add: publicProcedure.input(z.object({ name: z.string() })).mutation(({ input }) => {
    const newTodo = { id: todos.length + 1, name: input.name }
    todos.push(newTodo)
    return newTodo
  }),
} satisfies TRPCRouterRecord

const agentsRouter = {
  getAll: protectedProcedure.query(() => getAllAgentsFn()),
  getOne: protectedProcedure
    .input(agentsGetOneSchema)
    .query(({ input }) => getOneAgentFn({ data: input })),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(({ input }) => createAgentFn({ data: input })),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
  agents: agentsRouter,
})

export type TRPCRouter = typeof trpcRouter
export type AgentGetOne = inferRouterOutputs<TRPCRouter>['agents']['getOne']
