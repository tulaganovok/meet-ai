import { Button } from '#/components/ui/button'
import { Plus } from 'lucide-react'
import NewMeetingDialog from './new-meeting-dialog'
import { useState } from 'react'
import SearchFilter from './search-filter'
import StatusFilter from './status-filter'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import AgentFilter from './agent-filter'

export default function ListHeader() {
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false)
  const { meetings } = useTRPC()
  const { data } = useQuery(meetings.getMany.queryOptions({}))

  return (
    <>
      <div className='py-4 flex flex-col gap-y-4 w-full'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium text-xl'>My Meetings</h5>

          <Button onClick={() => setIsNewMeetingDialogOpen(true)}>
            <Plus /> New meeting
          </Button>
        </div>

        {data && data.meetings.length > 0 && (
          <div className='flex flex-col md:flex-row md:items-center gap-2'>
            <SearchFilter />

            <div className='flex items-center gap-x-2'>
              <AgentFilter />
              <StatusFilter />
            </div>
          </div>
        )}
      </div>

      <NewMeetingDialog open={isNewMeetingDialogOpen} onOpenChange={setIsNewMeetingDialogOpen} />
    </>
  )
}
