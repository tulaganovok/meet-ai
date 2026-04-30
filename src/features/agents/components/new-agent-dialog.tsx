import ResponsiveDialog from '#/components/shared/responsive-dialog'
import AgentForm from './agent-form'

interface NewAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NewAgentDialog({ open, onOpenChange }: NewAgentDialogProps) {
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
