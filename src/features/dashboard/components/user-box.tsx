import { authClient } from '#/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import GeneratedAvatar from '#/components/shared/generated-avatar'
import { useIsMobile } from '#/hooks/use-mobile'
import { Route } from '#/routes/dashboard/route'

export default function UserBox() {
  const { user } = Route.useLoaderData()
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/sign-in' })
        },
      },
    })
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2'>
          {user.image ? (
            <Avatar>
              <AvatarImage src={user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar seed={user.name} variant='initials' className='size-9 mr-3' />
          )}

          <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
            <p className='text-sm truncate w-full'>{user.name}</p>
            <p className='text-xs truncate w-full'>{user.email}</p>
          </div>
          <ChevronDownIcon className='size-4 shrink-0' />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{user.name}</DrawerTitle>
            <DrawerDescription>{user.email}</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <Button
              variant='outline'
              // onClick={() => authClient.customer.portal()}
            >
              <CreditCardIcon className='size-4 text-black' />
              Billing
            </Button>

            <Button variant='outline' onClick={onLogout}>
              <LogOutIcon className='size-4 text-black' />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
        {user.image ? (
          <Avatar>
            <AvatarImage src={user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar seed={user.name} variant='initials' className='size-9 mr-3' />
        )}

        <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
          <p className='text-sm truncate w-full'>{user.name}</p>
          <p className='text-xs truncate w-full text-neutral-300'>{user.email}</p>
        </div>

        <ChevronDownIcon className='size-4 shrink-0' />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        side='right'
        className='p-0'
        onCloseAutoFocus={e => e.preventDefault()}
      >
        <DropdownMenuLabel>
          <div className='flex items-center gap-x-2 pt-1'>
            {user.image ? (
              <Avatar>
                <AvatarImage src={user.image} />
              </Avatar>
            ) : (
              <GeneratedAvatar seed={user.name} variant='initials' className='size-9' />
            )}

            <div className='flex flex-col'>
              <span className='font-medium truncate text-base text-foreground leading-5'>
                {user.name}
              </span>

              <span className='text-sm font-normal text-muted-foreground truncate'>
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className='mt-1 mb-0' />

        <DropdownMenuItem
          // onClick={() => authClient.customer.portal()}
          className='cursor-pointer flex items-center py-2 rounded-0'
        >
          <CreditCardIcon className='size-4' />
          Billing
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className='cursor-pointer flex items-center py-2 rounded-0'
        >
          <LogOutIcon className='size-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
