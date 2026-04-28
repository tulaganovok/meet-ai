import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import SignUpForm from '#/features/auth/components/sign-up.form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export const Route = createFileRoute('/(auth)/sign-up/')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-semibold'>Let's get started</h1>
                <p className='text-muted-foreground text-balance'>Create your account</p>
              </div>

              <SignUpForm />

              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-card text-muted-foreground relative z-10 px-2'>
                  Or continue with
                </span>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <Button variant='outline' className='w-full'>
                  <FaGithub />
                  Github
                </Button>

                <Button variant='outline' className='w-full'>
                  <FaGoogle />
                  Google
                </Button>
              </div>

              <div className='text-center text-sm'>
                Already have an account?{' '}
                <Link to='/sign-in' className='underline underline-offset-4 text-primary'>
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          <div className='bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center'>
            <img src='/logo.svg' alt='Image' className='h-23 w-23' />
            <p className='text-2xl font-semibold text-white'>Meet.AI</p>
          </div>
        </CardContent>
      </Card>

      <div className='text-muted-foreground *:[a]:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and{' '}
        <a href='#'>Privacy Policy</a>
      </div>
    </div>
  )
}
