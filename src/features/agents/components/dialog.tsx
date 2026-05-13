import type { AgentGetOne } from '#/integrations/trpc/router'
import { AgentForm } from './form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useTRPC } from '#/integrations/trpc/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ResponsiveDialog } from '#/components/shared/dialog'

interface NewAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function NewAgentDialog({ open, onOpenChange }: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='New Agent'
      description='Create a new agent'
    >
      <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
    </ResponsiveDialog>
  )
}

interface UpdateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: AgentGetOne
}

function UpdateAgentDialog({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) {
  return (
    <ResponsiveDialog
      title='Edit Agent'
      description='Edit the agent details'
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}

interface DeleteAgentDialogProps {
  agentId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DeleteAgentDialog({ agentId, open, onOpenChange }: DeleteAgentDialogProps) {
  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const navigate = useNavigate()

  const deleteAgentMutation = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
        navigate({ to: '/dashboard/agents' })
        onOpenChange(false)
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your agent from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteAgentMutation.isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant={'destructive'}
            disabled={deleteAgentMutation.isPending}
            onClick={() => deleteAgentMutation.mutate({ id: agentId })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { NewAgentDialog, UpdateAgentDialog, DeleteAgentDialog }
