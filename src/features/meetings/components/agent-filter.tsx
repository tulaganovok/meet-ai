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
import GeneratedAvatar from '#/components/shared/generated-avatar'
import { Loader2Icon, MenuIcon } from 'lucide-react'

export default function AgentFilter() {
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
