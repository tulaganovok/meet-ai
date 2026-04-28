import { Button } from '#/components/ui/button'
import { authClient } from '#/lib/auth-client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <Button
      onClick={async () => {
        await authClient.signOut()
        navigate({ to: '/sign-in' })
      }}
    >
      Click me
    </Button>
  )
}
