import { EmptyState } from '#/components/shared/state'
import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { VideoIcon } from 'lucide-react'

interface UpcomingStateProps {
  meetingId: string
}

function UpcomingState({ meetingId }: UpcomingStateProps) {
  return (
    <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
      <EmptyState
        image='/upcoming.svg'
        title='Not started yet'
        description='Once you start this meeting, a summary will appear here'
      />

      <div className='flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full'>
        <Button className='w-full lg:w-auto' asChild>
          <Link to={`/call/$meetingId`} params={{ meetingId }}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}

function ProcessingState() {
  return (
    <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
      <EmptyState
        image='/processing.svg'
        title='Meeting completed'
        description='This meeting was completed, a summary will appear soon'
      />
    </div>
  )
}

interface ActiveStateProps {
  meetingId: string
}

function ActiveState({ meetingId }: ActiveStateProps) {
  return (
    <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
      <EmptyState
        image='/upcoming.svg'
        title='Meeting is active'
        description='Meeting will end once all participants have left'
      />

      <div className='flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full'>
        <Button className='w-full lg:w-auto' asChild>
          <Link to={`/call/$meetingId`} params={{ meetingId }}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}

function CompletedState() {
  return <div>CompletedState</div>
}

function CancelledState() {
  return (
    <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
      <EmptyState
        image='/cancelled.svg'
        title='Meeting cancelled'
        description='This meeting was cancelled'
      />
    </div>
  )
}

export { UpcomingState, ProcessingState, ActiveState, CompletedState, CancelledState }
