import { useTRPC } from '#/integrations/trpc/react'
import type { MeetingGetOne } from '#/integrations/trpc/router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { meetingsInsertSchema } from '../utils/schema'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { toast } from 'sonner'
import { useNavigate, useRouter } from '@tanstack/react-router'
import GeneratedAvatar from '#/components/shared/generated-avatar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import NewAgentDialog from '#/features/agents/components/new-agent-dialog'
import { useState } from 'react'

interface MeetingFormProps {
  initialValues?: MeetingGetOne
  onSuccess?: () => void
  onCancel?: () => void
}

export default function MeetingForm({ initialValues, onSuccess, onCancel }: MeetingFormProps) {
  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const router = useRouter()
  const navigate = useNavigate()

  const [openAgentDialog, setOpenAgentDialog] = useState(false)

  const { data } = useQuery(trpc.agents.getMany.queryOptions({}))

  const isEditing = !!initialValues?.id

  const createMeetingMutation = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async data => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))

        navigate({ to: '/dashboard/meetings/$meetingId', params: { meetingId: data.id } })
        onSuccess?.()
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const updateMeetingMutation = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))

        if (isEditing) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues?.id }),
          )
        }

        await router.invalidate()
        onSuccess?.()
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const isMeetingFormSubmitting = createMeetingMutation.isPending || updateMeetingMutation.isPending

  const meetingForm = useForm({
    defaultValues: {
      name: initialValues?.name ?? '',
      agentId: initialValues?.agentId ?? '',
    },
    validators: { onSubmit: meetingsInsertSchema },
    onSubmit: ({ value }) => {
      if (isEditing) {
        updateMeetingMutation.mutate({ ...value, id: initialValues.id })
      } else {
        createMeetingMutation.mutate(value)
      }
    },
  })

  return (
    <>
      <form
        id='meeting-form'
        className='space-y-4'
        onSubmit={e => {
          e.preventDefault()
          meetingForm.handleSubmit()
        }}
      >
        <FieldGroup>
          <meetingForm.Field
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
                    disabled={isMeetingFormSubmitting}
                    type='text'
                    placeholder='Enter meeting name'
                    autoComplete='off'
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <meetingForm.Field
            name='agentId'
            children={field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Agent</FieldLabel>

                  <Select
                    name={field.name}
                    value={field.state.value}
                    aria-invalid={isInvalid}
                    disabled={isMeetingFormSubmitting}
                    onValueChange={value => {
                      if (value === 'empty') return
                      field.handleChange(value)
                    }}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select an agent' />
                    </SelectTrigger>

                    {data && data.agents.length > 0 && (
                      <SelectContent position='popper'>
                        <SelectGroup>
                          {data.agents.map(agent => (
                            <SelectItem
                              key={agent.id}
                              value={agent.id}
                              className='flex items-center gap-x-2 py-1.5 px-2'
                            >
                              <GeneratedAvatar
                                variant='botttsNeutral'
                                seed={agent.name}
                                className='border size-6'
                              />

                              <span>{agent.name}</span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    )}
                  </Select>

                  {data && data.agents.length === 0 && (
                    <FieldDescription className='text-xs'>
                      No agents found.{' '}
                      <button
                        type='button'
                        className='text-primary hover:underline'
                        onClick={() => setOpenAgentDialog(true)}
                      >
                        Create an agent first.
                      </button>
                    </FieldDescription>
                  )}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <div className='flex items-center justify-between mt-1'>
            <Button
              type='button'
              variant={'outline'}
              disabled={isMeetingFormSubmitting}
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button type='submit' disabled={isMeetingFormSubmitting}>
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </FieldGroup>
      </form>

      <NewAgentDialog open={openAgentDialog} onOpenChange={setOpenAgentDialog} />
    </>
  )
}
