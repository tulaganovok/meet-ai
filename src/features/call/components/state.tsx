import { Button } from '#/components/ui/button'
import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk'
import { Link } from '@tanstack/react-router'

interface CallActiveProps {
  onLeave: () => void
  meetingName: string
}

function CallActive({ onLeave, meetingName }: CallActiveProps) {
  return (
    <div className='flex flex-col justify-between p-4 h-full text-white'>
      <div className='bg-[#101213] rounded-full p-4 flex items-center gap-4'>
        <Link
          to='/dashboard'
          className='flex items-center justify-center p-1 bg-white/10 rounded-full w-fit'
        >
          <img src='/logo.svg' width={22} height={22} alt='Logo' />
        </Link>

        <h4 className='text-base'>{meetingName}</h4>
      </div>

      <SpeakerLayout />

      <div className='bg-[#101213] rounded-full px-4'>
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  )
}

function CallEnded() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='py-4 px-8 flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
          <div className='flex flex-col gap-y-2 text-center'>
            <h6 className='text-lg font-medium'>You have ended the call</h6>
            <p className='text-sm'>Summary will appear in a few minutes.</p>
          </div>

          <Button asChild>
            <Link to='/dashboard/meetings'>Back to meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { CallActive, CallEnded }
