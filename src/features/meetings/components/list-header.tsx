import { Button } from '#/components/ui/button'
import { Plus } from 'lucide-react'
import NewMeetingDialog from './new-meeting-dialog'
import { useState } from 'react'

export default function ListHeader() {
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false)

  return (
    <>
      <div className='py-4 flex flex-col gap-y-4 w-full'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium text-xl'>My Meetings</h5>

          <Button onClick={() => setIsNewMeetingDialogOpen(true)}>
            <Plus /> New meeting
          </Button>
        </div>

        {/* <SearchFilter /> */}
      </div>

      <NewMeetingDialog open={isNewMeetingDialogOpen} onOpenChange={setIsNewMeetingDialogOpen} />
    </>
  )
}
