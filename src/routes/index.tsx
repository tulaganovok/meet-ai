import { Button } from '#/components/ui/button'
import { authClient } from '#/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <Button onClick={() => authClient.signOut()}>Click me</Button>
}
