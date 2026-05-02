import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Route } from '#/routes/dashboard/agents'
import { useNavigate } from '@tanstack/react-router'
import { SearchIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SearchFilter() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')

  const onClearSearchValue = () => {
    setSearchValue('')
    navigate({ to: '/dashboard/agents', search: { ...searchParams, search: undefined } })
  }

  useEffect(() => {
    setSearchValue(searchParams.search ?? '')
  }, [searchParams.search])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = searchValue.trimStart()

      if (trimmed === (searchParams.search ?? '')) return

      navigate({
        to: '/dashboard/agents',
        search: { ...searchParams, search: trimmed || undefined },
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchValue, searchParams.search, navigate])

  return (
    <div className='relative w-full md:w-64'>
      <Input
        placeholder='Filter by name'
        className='h-9 bg-white w-full md:w-64 px-7'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <SearchIcon className='size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' />

      {searchValue && (
        <Button
          size='icon'
          className='absolute right-0 h-9 top-1/2 -translate-y-1/2 text-muted-foreground z-10 rounded-l-none'
          variant='ghost'
          onClick={onClearSearchValue}
        >
          <X />
        </Button>
      )}
    </div>
  )
}
