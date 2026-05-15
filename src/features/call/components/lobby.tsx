import { LogInIcon } from 'lucide-react'
import {
  DefaultVideoPlaceholder,
  type StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from '@stream-io/video-react-sdk'

import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import { generateAvatarUrl } from '#/lib/utils'
import { Link } from '@tanstack/react-router'

function DisabledVideoPreview() {
  const { data } = authClient.useSession()

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? '',
          image:
            data?.user.image ??
            generateAvatarUrl({ seed: data?.user.name ?? '', variant: 'initials' }),
        } as StreamVideoParticipant
      }
    />
  )
}

function AllowBrowserPermissions() {
  return (
    <p className='text-sm'>
      Please grant your browser a permission to access your camera and microphone.
    </p>
  )
}

interface CallLobbyProps {
  onJoin: () => void
}

function CallLobby({ onJoin }: CallLobbyProps) {
  const { useCameraState, useMicrophoneState } = useCallStateHooks()

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState()
  const { hasBrowserPermission: hasCameraPermission } = useCameraState()

  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission

  return (
    <div className='flex flex-col items-center justify-center h-full  overflow-x-auto '>
      <div className='p-4 flex flex-1 items-center justify-center '>
        <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
          <div className='flex flex-col gap-y-2 text-center'>
            <h6 className='text-lg font-medium'>Ready to join?</h6>
            <p className='text-sm'>Set up your call before joining</p>
          </div>

          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermission ? DisabledVideoPreview : AllowBrowserPermissions
            }
            className='max-md:max-w-xs'
          />

          <div className='flex gap-x-2'>
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>

          <div className='flex gap-x-2 justify-between w-full'>
            <Button asChild variant='ghost'>
              <Link to='/dashboard/meetings'>Cancel</Link>
            </Button>

            <Button onClick={onJoin}>
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CallLobby }
