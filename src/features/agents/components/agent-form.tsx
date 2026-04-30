import { useTRPC } from '#/integrations/trpc/react'
import type { AgentGetOne } from '#/integrations/trpc/router'
import { useForm, useStore } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { agentsInsertSchema } from '../utils/schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import GeneratedAvatar from '#/components/shared/generated-avatar'
import { Textarea } from '#/components/ui/textarea'
import { toast } from 'sonner'

interface AgentFormProps {
  initialValues?: AgentGetOne
  onSuccess?: () => void
  onCancel?: () => void
}
export default function AgentForm({ initialValues, onSuccess, onCancel }: AgentFormProps) {
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const isEditing = !!initialValues?.id

  const createAgentMutation = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getAll.queryOptions())

        if (isEditing) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          )
        }

        onSuccess?.()
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const isAgentFormSubmitting = createAgentMutation.isPending

  const agentForm = useForm({
    defaultValues: {
      name: initialValues?.name ?? '',
      instructions: initialValues?.instructions ?? '',
    },
    validators: { onSubmit: agentsInsertSchema },
    onSubmit: ({ value }) => {
      if (isEditing) {
        console.log(value)
      } else {
        createAgentMutation.mutate(value)
      }
    },
  })

  const name = useStore(agentForm.store, state => state.values.name)

  return (
    <form
      id='agent-form'
      className='space-y-4'
      onSubmit={e => {
        e.preventDefault()
        agentForm.handleSubmit()
      }}
    >
      <GeneratedAvatar seed={name} variant='botttsNeutral' className='border size-16 mx-auto' />

      <FieldGroup>
        <agentForm.Field
          name='name'
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  disabled={isAgentFormSubmitting}
                  type='text'
                  placeholder='Enter agent name'
                  autoComplete='off'
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <agentForm.Field
          name='instructions'
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Instructions</FieldLabel>

                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  disabled={isAgentFormSubmitting}
                  placeholder='Type agent instructions...'
                  autoComplete='off'
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <div className='flex items-center justify-between mt-1'>
          <Button
            type='button'
            variant={'outline'}
            disabled={isAgentFormSubmitting}
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button type='submit' disabled={isAgentFormSubmitting}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
