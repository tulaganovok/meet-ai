import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/meetings/$meetingId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/meetings/$meetingId/"!</div>
}
