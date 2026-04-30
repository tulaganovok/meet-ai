import ErrorState from '#/components/shared/error-state'
import LoadingState from '#/components/shared/loading-state'
import ListHeader from '#/features/agents/components/list-header'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/agents/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { agents } = useTRPC()
  const { data, isLoading, isError } = useQuery(agents.getAll.queryOptions())

  if (isLoading)
    return <LoadingState title='Loading agents...' description='This will take a few seconds.' />

  if (isError)
    return <ErrorState title='Failed to load agents' description='Please try again later.' />

  return (
    <div>
      <ListHeader />
      Hello {data?.length} agents
    </div>
  )
}
