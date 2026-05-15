import { ErrorState, LoadingState } from '#/components/shared/state'
import { DeleteMeetingDialog, UpdateMeetingDialog } from '#/features/meetings/components/dialog'
import { MeetingHeader } from '#/features/meetings/components/header'
import {
  ActiveState,
  CancelledState,
  CompletedState,
  ProcessingState,
  UpcomingState,
} from '#/features/meetings/components/state'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard/meetings/$meetingId/')({
  loader: ({ params: { meetingId }, context: { queryClient, trpc } }) =>
    queryClient.fetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId })),
  head: ({ loaderData: agent }) => ({ meta: [{ title: `${agent?.name} | Meet AI` }] }),
  pendingMs: 0,
  component: MeetingIdPage,
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
})

function MeetingIdPage() {
  const meeting = Route.useLoaderData()
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
  const [deleteMeetingDialogOpen, setDeleteMeetingDialogOpen] = useState(false)

  useEffect(() => {
    if (meeting.name) {
      document.title = `${meeting.name} | Meet AI`
    }
  }, [meeting.name])

  return (
    <>
      <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <MeetingHeader
          meetingId={meeting.id}
          meetingName={meeting.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={() => setDeleteMeetingDialogOpen(true)}
        />

        {meeting.status === 'upcoming' && <UpcomingState meetingId={meeting.id} />}
        {meeting.status === 'processing' && <ProcessingState />}
        {meeting.status === 'active' && <ActiveState meetingId={meeting.id} />}
        {meeting.status === 'completed' && <CompletedState />}
        {meeting.status === 'cancelled' && <CancelledState />}
        {}
      </div>

      <UpdateMeetingDialog
        initialValues={meeting}
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
      />

      <DeleteMeetingDialog
        meetingId={meeting.id}
        open={deleteMeetingDialogOpen}
        onOpenChange={setDeleteMeetingDialogOpen}
      />
    </>
  )
}

function PendingComponent() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <LoadingState title='Loading meeting...' description='This will only take a few seconds.' />
    </div>
  )
}

function ErrorComponent() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <ErrorState
        title='Meeting not found'
        description='The agent you are looking for does not exist.'
      />
    </div>
  )
}
