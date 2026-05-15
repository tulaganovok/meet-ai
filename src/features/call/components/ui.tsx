import { StreamTheme, useCall } from '@stream-io/video-react-sdk'
import { useState } from 'react'
import { CallLobby } from './lobby'
import { CallActive, CallEnded } from './state'

interface CallUIProps {
  meetingName: string
}

function CallUI({ meetingName }: CallUIProps) {
  const call = useCall()
  const [show, setShow] = useState<'lobby' | 'call' | 'ended'>('lobby')

  const handleJoin = async () => {
    if (!call) return

    await call.join()

    setShow('call')
  }

  const handleLeave = () => {
    if (!call) return

    call.endCall()
    setShow('ended')
  }

  return (
    <StreamTheme className='h-screen'>
      {show === 'lobby' && <CallLobby onJoin={handleJoin}  />}
      {show === 'call' && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
      {show === 'ended' && <CallEnded />}
    </StreamTheme>
  )
}

export { CallUI }
