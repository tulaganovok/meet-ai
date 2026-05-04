import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(overview)/')({
  component: OverviewPage,
})

function OverviewPage() {
  return <div>Hello "/dashboard/(overview)/"!</div>
}
