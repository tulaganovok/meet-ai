import { authClient } from '#/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function useOAuth() {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const signIn = async (provider: 'github' | 'google') => {
    setIsPending(true)

    try {
      await authClient.signIn.social(
        { provider },
        {
          onSuccess: () => {
            navigate({ to: '/dashboard' })
          },
          onError: ({ error }) => {
            toast.error(error.message)
          },
        },
      )
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, signIn }
}
