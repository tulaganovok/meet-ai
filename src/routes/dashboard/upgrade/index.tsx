import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/upgrade/')({
  component: UpgradePage,
  head: () => ({ meta: [{ title: 'Upgrade | Meet AI' }] }),
})

function UpgradePage() {
  return <div>Hello "/dashboard/upgrade/"!</div>
}
