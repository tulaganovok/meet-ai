import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '#/lib/constants'
import { z } from 'zod'

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  agentId: z.string().min(1, 'Agent is required'),
})

export const meetingsGetOneSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})

export const meetingsGetManySchema = z.object({
  page: z.number().default(DEFAULT_PAGE),
  pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish(),
})

export const meetingsSearchSchema = z.object({
  search: z.string().nullish(),
  page: z.number().optional(),
})

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, 'ID is required'),
})

export const meetingsDeleteSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})
