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
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  Loader2Icon,
  LoaderIcon,
  MenuIcon,
  VideoIcon,
} from 'lucide-react'
import { Input } from '#/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MeetingStatus } from '../utils/schema'
import { GeneratedAvatar } from '#/components/shared/avatar'

function SearchFilter() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = searchValue.trimStart()

      if (trimmed === (searchParams.search ?? '')) return

      navigate({
        to: '/dashboard/meetings',
        search: { ...searchParams, search: trimmed || undefined },
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchValue, searchParams.search, navigate])

  return (
    <div className='relative w-full md:w-64'>
      <Input
        placeholder='Filter by name'
        className='bg-white w-full md:w-64 px-7'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <SearchIcon className='size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' />
    </div>
  )
}

function AgentFilter() {
  const searchParams = Route.useSearch()
  const { agents } = useTRPC()
  const { data, isLoading } = useQuery(agents.getMany.queryOptions({}))
  const navigate = useNavigate()

  if (isLoading)
    return (
      <Select defaultValue='isLoading'>
        <SelectTrigger className='w-full bg-background md:min-w-40'>
          <SelectValue />
        </SelectTrigger>

        <SelectContent position='popper'>
          <SelectGroup>
            <SelectItem value='isLoading' className='flex items-center gap-x-2 py-2 px-3'>
              <Loader2Icon className='animate-spin' />
              Loading...
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

  return (
    <Select
      defaultValue={'all'}
      value={searchParams.agentId ?? 'all'}
      onValueChange={value =>
        navigate({
          to: '/dashboard/meetings',
          search: {
            ...searchParams,
            agentId: value !== 'all' && value !== 'isLoading' ? value : undefined,
          },
        })
      }
    >
      <SelectTrigger className='w-full bg-background md:min-w-40'>
        <SelectValue />
      </SelectTrigger>

      {data && data.agents.length > 0 && (
        <SelectContent position='popper'>
          <SelectGroup>
            <SelectItem value='all' className='flex items-center gap-x-2 py-2 px-3'>
              <MenuIcon />
              All
            </SelectItem>

            {data.agents.map(agent => (
              <SelectItem
                key={agent.id}
                value={agent.id}
                className='flex items-center gap-x-2 py-1.5 px-2'
              >
                <GeneratedAvatar
                  variant='botttsNeutral'
                  seed={agent.name}
                  className='border size-6'
                />

                <span>{agent.name}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      )}
    </Select>
  )
}

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

function StatusFilter() {
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

export { SearchFilter, AgentFilter, StatusFilter }
