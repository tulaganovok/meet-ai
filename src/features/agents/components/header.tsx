import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, Plus, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { NewAgentDialog } from './dialog'
import { SearchFilter } from './filter'

interface AgentHeaderProps {
  agentId: string
  agentName: string
  onEdit: () => void
  onRemove: () => void
}

function AgentHeader({ agentId, agentName, onEdit, onRemove }: AgentHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl'>
              <Link to='/dashboard/agents'>My Agents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className='text-foreground text-xl font-medium [&>svg]:size-4'>
            <ChevronRightIcon />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl text-foreground'>
              <Link to={`/dashboard/agents/$agentId`} params={{ agentId }}>
                {agentName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={onEdit}>
            <PencilIcon className='size-4 text-black' />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onRemove}>
            <TrashIcon className='size-4 text-black' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function AgentsHeader() {
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

export { AgentHeader, AgentsHeader }
