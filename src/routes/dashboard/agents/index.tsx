import EmptyState from '#/components/shared/empty-state'
import ErrorState from '#/components/shared/error-state'
import LoadingState from '#/components/shared/loading-state'
import { columns } from '#/features/agents/components/columns'
import { DataTable } from '#/features/agents/components/data-table'
import ListHeader from '#/features/agents/components/list-header'
import Pagination from '#/features/agents/components/pagination'
import { agentsSearchSchema } from '#/features/agents/utils/schema'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

export const Route = createFileRoute('/dashboard/agents/')({
  component: RouteComponent,
  validateSearch: zodValidator(agentsSearchSchema),
})

function RouteComponent() {
  const searchParams = Route.useSearch()
  const { agents } = useTRPC()
  const { data, isLoading, isError } = useQuery(agents.getMany.queryOptions(searchParams))
  const navigate = useNavigate()

  return (
    <div className='px-4 md:px-8'>
      <ListHeader />

      {isLoading && (
        <div className='flex py-32 justify-center'>
          <LoadingState title='Loading agents...' description='This will take a few seconds.' />
        </div>
      )}

      {data && (
        <div className='flex-1 pb-4 flex flex-col gap-y-12'>
          <div>
            <DataTable columns={columns} data={data.agents} />

            {data.agents.length > 0 && (
              <Pagination
                page={searchParams.page ?? 1}
                totalPages={data.totalPages}
                onPageChange={newPage =>
                  navigate({
                    to: '/dashboard/agents',
                    search: { ...searchParams, page: newPage === 1 ? undefined : newPage },
                  })
                }
              />
            )}
          </div>

          {data && data.agents.length === 0 && (
            <EmptyState
              title='Create your first agent'
              description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'
            />
          )}
        </div>
      )}

      {isError && (
        <div className='flex justify-center py-32'>
          <ErrorState title='Failed to load agents' description='Please try again later.' />
        </div>
      )}
    </div>
  )
}
