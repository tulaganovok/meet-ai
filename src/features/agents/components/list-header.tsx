import { Button } from '#/components/ui/button'
import { Plus } from 'lucide-react'
import NewAgentDialog from './new-agent-dialog'
import { useState } from 'react'

export default function ListHeader() {
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false)
  
  return (
    <>
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium text-xl'>My Agents</h5>

          <Button onClick={() => setIsNewAgentDialogOpen(true)}>
            <Plus /> Create
          </Button>
        </div>
      </div>

      <NewAgentDialog open={isNewAgentDialogOpen} onOpenChange={setIsNewAgentDialogOpen} />
    </>
  )
}
