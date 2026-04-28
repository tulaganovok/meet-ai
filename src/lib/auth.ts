import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db/index'
import * as schema from '../db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: { ...schema } }),
  emailAndPassword: { enabled: true },
  plugins: [tanstackStartCookies()],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
})
