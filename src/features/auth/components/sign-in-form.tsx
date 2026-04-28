import { Button } from '#/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useForm, useStore } from '@tanstack/react-form'
import { signInFormSchema } from '../schemas/sign-in.schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { authClient } from '#/lib/auth-client'
import { useState } from 'react'
import { Alert, AlertTitle } from '#/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const signInForm = useForm({
    defaultValues: { email: '', password: '' },
    validators: { onSubmit: signInFormSchema },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        { email: value.email, password: value.password },
        {
          onSuccess: () => {
            navigate({ to: '/' })
          },
          onError: ({ error }) => {
            setErrorMessage(error.message)
          },
        },
      )
    },
  })

  const isSignInFormSubmitting = useStore(signInForm.store, state => state.isSubmitting)

  return (
    <div>
      {errorMessage && (
        <Alert variant={'destructive'} className='w-full mb-3 bg-red-100 rounded-sm'>
          <AlertCircleIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}

      <form
        id='sign-in-form'
        onSubmit={e => {
          e.preventDefault()
          signInForm.handleSubmit()
        }}
      >
        <FieldGroup>
          <signInForm.Field
            name='email'
            children={field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email address</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isSignInFormSubmitting}
                    type='email'
                    placeholder='Enter your email address'
                    autoComplete='email'
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <signInForm.Field
            name='password'
            children={field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isSignInFormSubmitting}
                    type='password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <Button type='submit' disabled={isSignInFormSubmitting}>
            Sign in
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
