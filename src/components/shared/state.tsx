import { AlertCircleIcon, Loader2Icon } from 'lucide-react'

interface LoadingStateProps {
  title: string
  description: string
}

function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm w-md'>
      <Loader2Icon className='size-6 animate-spin text-primary' />

      <div className='flex flex-col gap-y-2 text-center'>
        <h6 className='text-lg font-medium'>{title}</h6>
        <p className='text-sm'>{description}</p>
      </div>
    </div>
  )
}

interface ErrorStateProps {
  title: string
  description: string
}

function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm w-md'>
      <AlertCircleIcon className='size-6 text-red-500' />

      <div className='flex flex-col gap-y-2 text-center'>
        <h6 className='text-lg font-medium'>{title}</h6>
        <p className='text-sm'>{description}</p>
      </div>
    </div>
  )
}

interface EmptyStateProps {
  title: string
  description: string
  image?: string
}

function EmptyState({ title, description, image = '/empty.svg' }: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src={image} alt='Empty' width={240} height={240} />

      <div className='flex flex-col gap-y-2 max-w-md mx-auto text-center'>
        <h6 className='text-lg font-medium'>{title}</h6>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}

export { LoadingState, ErrorState, EmptyState }
