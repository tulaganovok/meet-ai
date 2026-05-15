import { LoaderIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import { useTRPC } from '#/integrations/trpc/react'
import { CallUI } from './ui'
import { getStreamVideoClient } from '#/lib/stream-client'

interface CallConnectProps {
  meetingId: string
  meetingName: string
  userId: string
  userName: string
  userImage: string
}

function CallConnect({ meetingId, meetingName, userId, userName, userImage }: CallConnectProps) {
  const trpc = useTRPC()
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateStreamUserToken.mutationOptions(),
  )

  const [client, setClient] = useState<StreamVideoClient>()

  useEffect(() => {
    const _client = getStreamVideoClient({
      apiKey: 'mxakayqvqhcj',
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: async () => {
        return await generateToken()
      },
    })

    setClient(_client)
  }, [userId, userName, userImage, generateToken])

  const [call, setCall] = useState<Call>()

  useEffect(() => {
    if (!client) return

    const _call = client.call('default', meetingId)
    _call.camera.disable()
    _call.microphone.disable()
    setCall(_call)

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        void _call.leave()
      }

      setCall(undefined)
    }
  }, [client, meetingId])

  if (!client || !call) {
    return (
      <div className='flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar'>
        <LoaderIcon className='size-6 animate-spin text-white' />
      </div>
    )
  }

  return (
    <div className='flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar'>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallUI meetingName={meetingName} />
        </StreamCall>
      </StreamVideo>
    </div>
  )
}

export { CallConnect }
