import { Button } from '#/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { AgentFilter, SearchFilter, StatusFilter } from './filter'
import { NewMeetingDialog } from './dialog'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'

interface MeetingHeaderProps {
  meetingId: string
  meetingName: string
  onEdit: () => void
  onRemove: () => void
}

function MeetingHeader({ meetingId, meetingName, onEdit, onRemove }: MeetingHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl'>
              <Link to='/dashboard/meetings'>My Meetings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className='text-foreground text-xl font-medium [&>svg]:size-4'>
            <ChevronRightIcon />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl text-foreground'>
              <Link to={`/dashboard/meetings/$meetingId`} params={{ meetingId }}>
                {meetingName}
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

function MeetingsHeader() {
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

export { MeetingHeader, MeetingsHeader }
