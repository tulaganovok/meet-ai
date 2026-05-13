import type { MeetingGetOne } from '#/integrations/trpc/router'
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
import { MeetingForm } from './form'
import { ResponsiveDialog } from '#/components/shared/dialog'

interface NewMeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function NewMeetingDialog({ open, onOpenChange }: NewMeetingDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='New Meeting'
      description='Create a new meeting'
    >
      <MeetingForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
    </ResponsiveDialog>
  )
}

interface UpdateMeetingDialogProps {
  initialValues: MeetingGetOne
  open: boolean
  onOpenChange: (open: boolean) => void
}

function UpdateMeetingDialog({ initialValues, open, onOpenChange }: UpdateMeetingDialogProps) {
  return (
    <ResponsiveDialog
      title='Edit Meeting'
      description='Edit the meeting details'
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}

interface DeleteMeetingDialogProps {
  meetingId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DeleteMeetingDialog({ meetingId, open, onOpenChange }: DeleteMeetingDialogProps) {
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

export { NewMeetingDialog, UpdateMeetingDialog, DeleteMeetingDialog }
