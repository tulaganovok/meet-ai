import { StreamClient } from '@stream-io/node-sdk'
import { TRPCError } from '@trpc/server'

const apiKey = process.env.STREAM_API_KEY
const secretKey = process.env.STREAM_SECRET_KEY

if (!apiKey || !secretKey)
  throw new TRPCError({ code: 'FORBIDDEN', message: 'Invalid Stream API key or secret key' })

export const streamClient = new StreamClient(apiKey, secretKey)
