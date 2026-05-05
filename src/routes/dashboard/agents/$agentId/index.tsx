import ErrorState from '#/components/shared/error-state'
import GeneratedAvatar from '#/components/shared/generated-avatar'
import LoadingState from '#/components/shared/loading-state'
import { Badge } from '#/components/ui/badge'
import AgentHeader from '#/features/agents/components/agent-header'
import DeleteAgentDialog from '#/features/agents/components/delete-agent-dialog'
import UpdateAgentDialog from '#/features/agents/components/update-agent-dialog'
import { createFileRoute } from '@tanstack/react-router'
import { VideoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard/agents/$agentId/')({
  loader: ({ params: { agentId }, context: { queryClient, trpc } }) =>
    queryClient.fetchQuery(trpc.agents.getOne.queryOptions({ id: agentId })),
  head: ({ loaderData: agent }) => ({ meta: [{ title: `${agent?.name} | Meet AI` }] }),
  pendingMs: 0,
  component: AgentIdPage,
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
})

function AgentIdPage() {
  const agent = Route.useLoaderData()
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false)
  const [deleteAgentDialogOpen, setDeleteAgentDialogOpen] = useState(false)

  useEffect(() => {
    if (agent.name) {
      document.title = `${agent.name} | Meet AI`
    }
  }, [agent.name])

  return (
    <>
      <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <AgentHeader
          agentId={agent.id}
          agentName={agent.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={() => setDeleteAgentDialogOpen(true)}
        />

        <div className='bg-white rounded-lg border'>
          <div className='px-4 py-5 gap-y-5 flex flex-col col-span-5'>
            <div className='flex items-center gap-x-3'>
              <GeneratedAvatar variant='botttsNeutral' seed={agent.name} className='size-10' />
              <h2 className='text-2xl font-medium'>{agent.name}</h2>
            </div>

            <Badge variant='outline' className='flex items-center gap-x-2 [&>svg]:size-4'>
              <VideoIcon className='text-blue-700' />0 meeting
            </Badge>

            <div className='flex flex-col gap-y-4'>
              <p className='text-lg font-medium'>Instructions</p>
              <p className='text-neutral-800'>{agent.instructions}</p>
            </div>
          </div>
        </div>
      </div>

      <UpdateAgentDialog
        initialValues={agent}
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
      />

      <DeleteAgentDialog
        agentId={agent.id}
        open={deleteAgentDialogOpen}
        onOpenChange={setDeleteAgentDialogOpen}
      />
    </>
  )
}

function PendingComponent() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <LoadingState title='Loading agent...' description='This will only take a few seconds.' />
    </div>
  )
}

function ErrorComponent() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <ErrorState
        title='Agent not found'
        description='The agent you are looking for does not exist.'
      />
    </div>
  )
}
