import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/upgrade/')({
  component: UpgradePage,
})

function UpgradePage() {
  return <div>Hello "/dashboard/upgrade/"!</div>
}
