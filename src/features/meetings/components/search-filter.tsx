import { Input } from '#/components/ui/input'
import { Route } from '#/routes/dashboard/meetings'
import { useNavigate } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SearchFilter() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = searchValue.trimStart()

      if (trimmed === (searchParams.search ?? '')) return

      navigate({
        to: '/dashboard/meetings',
        search: { ...searchParams, search: trimmed || undefined },
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchValue, searchParams.search, navigate])

  return (
    <div className='relative w-full md:w-64'>
      <Input
        placeholder='Filter by name'
        className='bg-white w-full md:w-64 px-7'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <SearchIcon className='size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' />
    </div>
  )
}
