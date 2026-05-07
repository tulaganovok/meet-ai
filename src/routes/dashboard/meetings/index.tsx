import { DataTable } from '#/components/shared/data-table'
import EmptyState from '#/components/shared/empty-state'
import ErrorState from '#/components/shared/error-state'
import LoadingState from '#/components/shared/loading-state'
import { columns } from '#/features/meetings/components/columns'
import ListHeader from '#/features/meetings/components/list-header'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/meetings/')({
  component: MeetingsPage,
  head: () => ({ meta: [{ title: 'Meetings | Meet AI' }] }),
})

function MeetingsPage() {
  const { meetings } = useTRPC()
  const { data, isLoading, isError } = useQuery(meetings.getMany.queryOptions({}))
  const navigate = useNavigate()

  return (
    <div className='px-4 md:px-8'>
      <ListHeader />

      {isLoading && (
        <div className='flex py-32 justify-center'>
          <LoadingState title='Loading meetings...' description='This will take a few seconds.' />
        </div>
      )}

      {data && (
        <div className='flex-1 pb-4 flex flex-col gap-y-12'>
          <div>
            <DataTable
              variant='meeting'
              columns={columns}
              data={data.meetings}
              onRowClick={row =>
                navigate({ to: '/dashboard/meetings/$meetingId', params: { meetingId: row.id } })
              }
            />

            {/* {data.meetings.length > 0 && (
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
            )} */}
          </div>

          {data && data.meetings.length === 0 && (
            <EmptyState
              title='Create your first meeting'
              description='Create an meeting to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'
            />
          )}
        </div>
      )}

      {isError && (
        <div className='flex justify-center py-32'>
          <ErrorState title='Failed to load meetings' description='Please try again later.' />
        </div>
      )}
    </div>
  )
}
