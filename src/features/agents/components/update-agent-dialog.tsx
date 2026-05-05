import ResponsiveDialog from '#/components/shared/responsive-dialog'
import type { AgentGetOne } from '#/integrations/trpc/router'
import AgentForm from './agent-form'

interface UpdateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: AgentGetOne
}

export default function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) {
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
