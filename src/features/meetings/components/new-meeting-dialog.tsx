import ResponsiveDialog from '#/components/shared/responsive-dialog'
import MeetingForm from './meeting-form'

interface NewMeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NewMeetingDialog({ open, onOpenChange }: NewMeetingDialogProps) {
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
