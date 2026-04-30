import EmptyState from '#/components/shared/empty-state'
import ErrorState from '#/components/shared/error-state'
import LoadingState from '#/components/shared/loading-state'
import { columns } from '#/features/agents/components/columns'
import { DataTable } from '#/features/agents/components/data-table'
import ListHeader from '#/features/agents/components/list-header'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/agents/')({
  component: RouteComponent,
})

function RouteComponent() {
  const trpc = useTRPC()
  const { data: agents, isLoading, isError } = useQuery(trpc.agents.getAll.queryOptions())

  if (isLoading)
    return <LoadingState title='Loading agents...' description='This will take a few seconds.' />

  if (isError)
    return <ErrorState title='Failed to load agents' description='Please try again later.' />

  return (
    <>
      <ListHeader />

      <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-12'>
        <DataTable columns={columns} data={agents ?? []} />

        {agents?.length === 0 && (
          <EmptyState
            title='Create your first agent'
            description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'
          />
        )}
      </div>
    </>
  )
}
