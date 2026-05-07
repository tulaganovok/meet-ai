import { Button } from '#/components/ui/button'
import { Plus } from 'lucide-react'
import NewAgentDialog from './new-agent-dialog'
import { useState } from 'react'
import SearchFilter from './search-filter'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'

export default function ListHeader() {
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false)
  const { agents } = useTRPC()
  const { data } = useQuery(agents.getMany.queryOptions({}))

  return (
    <>
      <div className='py-4 flex flex-col gap-y-4 w-full'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium text-xl'>My Agents</h5>

          <Button onClick={() => setIsNewAgentDialogOpen(true)}>
            <Plus /> New agent
          </Button>
        </div>

        {data && data.agents.length > 0 && <SearchFilter />}
      </div>

      <NewAgentDialog open={isNewAgentDialogOpen} onOpenChange={setIsNewAgentDialogOpen} />
    </>
  )
}
