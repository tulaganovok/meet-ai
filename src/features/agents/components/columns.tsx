import GeneratedAvatar from '#/components/shared/generated-avatar'
import { Badge } from '#/components/ui/badge'
import type { AgentGetOne } from '#/integrations/trpc/router'
import type { ColumnDef } from '@tanstack/react-table'
import { CornerDownRightIcon, VideoIcon } from 'lucide-react'

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className='flex flex-col gap-y-1'>
        <div className='flex items-center gap-x-2'>
          <GeneratedAvatar variant='botttsNeutral' seed={row.original.name} className='size-6' />
          <span className='font-medium capitalize'>{row.original.name}</span>
        </div>

        <div className='flex items-center gap-x-1'>
          <CornerDownRightIcon className='size-3 text-muted-foreground' />

          <span className='text-xs text-muted-foreground max-w-50 truncate capitalize'>
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'meetingsCount',
    header: 'Meetings',
    cell: () => (
      <Badge variant={'outline'} className='flex items-center gap-x-2 text-sm'>
        <VideoIcon className='text-blue-700' />
        {(Math.random() * 10).toFixed(0)} meetings
      </Badge>
    ),
  },
]
