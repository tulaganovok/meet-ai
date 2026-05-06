import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(overview)/')({
  component: OverviewPage,
  head: () => ({ meta: [{ title: 'Overview | Meet AI' }] }),
})

function OverviewPage() {
  return <div>Hello "/dashboard/(overview)/"!</div>
}
