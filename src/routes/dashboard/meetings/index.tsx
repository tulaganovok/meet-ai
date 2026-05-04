import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/meetings/')({
  component: MeetingsPage,
})

function MeetingsPage() {
  return <div>Hello "/dashboard/meetings/"!</div>
}
