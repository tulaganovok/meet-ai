import { Button } from '#/components/ui/button'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <Outlet />
      </div>

      <Button variant={'outline'} className='absolute left-8 top-4 md:left-24 md:top-12' asChild>
        <Link to='/'>
          <ArrowLeft /> Back to Home
        </Link>
      </Button>
    </div>
  )
}
