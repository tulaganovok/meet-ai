import { CircleXIcon, CircleCheckIcon, ClockArrowUpIcon, VideoIcon, LoaderIcon, MenuIcon } from 'lucide-react'
import { MeetingStatus } from '../utils/schema'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { Route } from '#/routes/dashboard/meetings'
import { useNavigate } from '@tanstack/react-router'

const options = [
  {
    id: 'all',
    value: 'all',
    render: (
      <div className='flex items-center gap-x-2 capitalize'>
        <MenuIcon />
        All
      </div>
    ),
  },
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    render: (
      <div className='flex items-center gap-x-2 capitalize'>
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    render: (
      <div className='flex items-center gap-x-2 capitalize'>
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    render: (
      <div className='flex items-center gap-x-2 capitalize'>
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    render: (
      <div className='flex items-center gap-x-2 capitalize'>
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    render: (
      <div className='flex items-center gap-x-2 capitalize'>
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
]

export default function StatusFilter() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()

  return (
    <Select
      defaultValue={options[0].value}
      value={searchParams.status ?? options[0].value}
      onValueChange={value =>
        navigate({
          to: '/dashboard/meetings',
          search: {
            ...searchParams,
            status: value !== 'all' ? (value as MeetingStatus) : undefined,
          },
        })
      }
    >
      <SelectTrigger className='w-full bg-background md:min-w-40'>
        <SelectValue />
      </SelectTrigger>

      <SelectContent position='popper'>
        <SelectGroup>
          {options.map(option => (
            <SelectItem
              key={option.id}
              value={option.id}
              className='flex items-center gap-x-2 py-1.5 px-2'
            >
              {option.render}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
