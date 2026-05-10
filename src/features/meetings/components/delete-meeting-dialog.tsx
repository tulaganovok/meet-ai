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

interface DeleteMeetingDialogProps {
  meetingId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteMeetingDialog({
  meetingId,
  open,
  onOpenChange,
}: DeleteMeetingDialogProps) {
  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const navigate = useNavigate()

  const deleteMeetingMutation = useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        navigate({ to: '/dashboard/meetings' })
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
            This action cannot be undone. This will permanently delete your meeting from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMeetingMutation.isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant={'destructive'}
            disabled={deleteMeetingMutation.isPending}
            onClick={() => deleteMeetingMutation.mutate({ id: meetingId })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
