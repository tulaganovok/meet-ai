import { ErrorState, LoadingState } from '#/components/shared/state'
import { CallProvider } from '#/features/call/components/provider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/call/$meetingId/')({
  loader: ({ params: { meetingId }, context: { queryClient, trpc } }) =>
    queryClient.fetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId })),
  head: ({ loaderData: agent }) => ({ meta: [{ title: `Call - ${agent?.name} | Meet AI` }] }),
  pendingMs: 0,
  component: CallMeetingIdPage,
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
})

function CallMeetingIdPage() {
  const meeting = Route.useLoaderData()

  if (meeting.status === 'completed')
    return (
      <div className='flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar'>
        <ErrorState title='Meeting has ended' description='You can no longer join this meeting' />
      </div>
    )

  return <CallProvider meetingId={meeting.id} meetingName={meeting.name} />
}

function PendingComponent() {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-radial from-sidebar-accent to-sidebar'>
      <LoadingState title='Loading call...' description='This will only take a few seconds.' />
    </div>
  )
}

function ErrorComponent() {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-radial from-sidebar-accent to-sidebar'>
      <ErrorState
        title='Call not found'
        description='The agent you are looking for does not exist.'
      />
    </div>
  )
}
