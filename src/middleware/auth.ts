import { auth } from '#/lib/auth'
import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const authFnMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })

  if (!session) throw redirect({ to: '/sign-in' })

  return next({ context: { session } })
})

export const authReqMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ pathname, next }) => {
    const privateRoutes = ['/dashboard']
    const publicRoutes = ['/', '/sign-in', '/sign-up']

    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    const isPrivateRoute = privateRoutes.some(
      privateRoute => pathname === privateRoute || pathname.startsWith(`${privateRoute}/`),
    )

    const isAuthRoute = publicRoutes.includes(pathname)

    if (!session && isPrivateRoute) throw redirect({ to: '/sign-in' })
    if (session && isAuthRoute) throw redirect({ to: '/dashboard' })

    return next({ context: { session } })
  },
)
