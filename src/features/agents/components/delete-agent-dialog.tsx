import { useTRPC } from '#/integrations/trpc/react'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

interface DeleteAgentDialogProps {
  agentId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteAgentDialog({ agentId, open, onOpenChange }: DeleteAgentDialogProps) {
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
            This action cannot be undone. This will permanently delete your agent from our
            servers.
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
