import ResponsiveDialog from '#/components/shared/responsive-dialog'
import type { MeetingGetOne } from '#/integrations/trpc/router'
import MeetingForm from './meeting-form'

interface UpdateMeetingDialogProps {
  initialValues: MeetingGetOne
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdateMeetingDialog({
  initialValues,
  open,
  onOpenChange,
}: UpdateMeetingDialogProps) {
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
