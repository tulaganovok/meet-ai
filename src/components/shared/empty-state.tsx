interface EmptyStateProps {
  title: string
  description: string
  image?: string
}

export default function EmptyState({ title, description, image = '/empty.svg' }: EmptyStateProps) {
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
