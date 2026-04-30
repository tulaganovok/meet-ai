import { Button } from '#/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useForm, useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { authClient } from '#/lib/auth-client'
import { Alert, AlertTitle } from '#/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { signUpFormSchema } from '../utils/schema'

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const signUpForm = useForm({
    defaultValues: { name: '', email: '', password: '' },
    validators: { onSubmit: signUpFormSchema },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(value, {
        onSuccess: () => {
          navigate({ to: '/dashboard' })
        },
        onError: ({ error }) => {
          setErrorMessage(error.message)
        },
      })
    },
  })

  const isSignUpFormSubmitting = useStore(signUpForm.store, state => state.isSubmitting)

  return (
    <div>
      {errorMessage && (
        <Alert variant={'destructive'} className='w-full mb-3 bg-red-100 rounded-sm'>
          <AlertCircleIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}

      <form
        id='sign-up-form'
        onSubmit={e => {
          e.preventDefault()
          signUpForm.handleSubmit()
        }}
      >
        <FieldGroup>
          <signUpForm.Field
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
                    disabled={isSignUpFormSubmitting}
                    type='text'
                    placeholder='Enter your name'
                    autoComplete='name'
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <signUpForm.Field
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
                    disabled={isSignUpFormSubmitting}
                    type='email'
                    placeholder='Enter your email address'
                    autoComplete='email'
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <signUpForm.Field
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
                    disabled={isSignUpFormSubmitting}
                    type='password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <Button type='submit' disabled={isSignUpFormSubmitting}>
            Sign up
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
