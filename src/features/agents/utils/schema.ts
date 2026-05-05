import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '#/lib/constants'
import { z } from 'zod'

export const agentsInsertSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  instructions: z.string().min(1, 'Instructions are required'),
})

export const agentsGetOneSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})

export const agentsGetManySchema = z.object({
  page: z.number().default(DEFAULT_PAGE),
  pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish(),
})

export const agentsSearchSchema = z.object({
  search: z.string().nullish(),
  page: z.number().optional(),
})

export const agentsUpdateSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  instructions: z.string().min(1, 'Instructions are required'),
})

export const agentsDeleteSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})
