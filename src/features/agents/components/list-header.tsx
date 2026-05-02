import { Button } from '#/components/ui/button'
import { Plus } from 'lucide-react'
import NewAgentDialog from './new-agent-dialog'
import { useState } from 'react'
import SearchFilter from './search-filter'

export default function ListHeader() {
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false)

  return (
    <>
      <div className='py-4 flex flex-col gap-y-4 w-full'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium text-xl'>My Agents</h5>

          <Button onClick={() => setIsNewAgentDialogOpen(true)}>
            <Plus /> Create
          </Button>
        </div>

        <SearchFilter />
      </div>

      <NewAgentDialog open={isNewAgentDialogOpen} onOpenChange={setIsNewAgentDialogOpen} />
    </>
  )
}
