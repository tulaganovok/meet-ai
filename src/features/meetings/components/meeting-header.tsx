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
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'

interface MeetingHeaderProps {
  meetingId: string
  meetingName: string
  onEdit: () => void
  onRemove: () => void
}

export default function MeetingHeader({
  meetingId,
  meetingName,
  onEdit,
  onRemove,
}: MeetingHeaderProps) {
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
