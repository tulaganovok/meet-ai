import { Separator } from '#/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'
import { cn } from '#/lib/utils'
import { Link, linkOptions, useLocation } from '@tanstack/react-router'
import { BotIcon, LayoutDashboard, StarIcon, VideoIcon } from 'lucide-react'
import UserBox from './user-box'

const firstSection = linkOptions([
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/meetings', label: 'Meetings', icon: VideoIcon },
  { to: '/dashboard/agents', label: 'Agents', icon: BotIcon },
])

const secondSection = linkOptions([{ to: '/dashboard/upgrade', label: 'Upgrade', icon: StarIcon }])

export default function DashboardSidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className='text-sidebar-accent-foreground'>
        <Link to='/dashboard' className='flex items-center gap-2 px-2 pt-2'>
          <img src='/logo.svg' height={36} width={36} alt='Meet.AI' />
          <p className='text-2xl font-semibold'>Meet AI</p>
        </Link>
      </SidebarHeader>

      <div className='px-4 py-2'>
        <Separator className='bg-muted-foreground h-px' />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-2'>
              {firstSection.map(item => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent to-sidebar/50 bg-sidebar!',
                      pathname === item.to && 'bg-linear-to-r/oklch border-[#5D6B68]/10',
                    )}
                    isActive={pathname === item.to}
                  >
                    <Link to={item.to}>
                      <item.icon className='size-5!' />
                      <span className='text-base font-medium tracking-tight'>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className='px-4 py-2'>
          <Separator className='bg-muted-foreground h-px' />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-2'>
              {secondSection.map(item => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5%  to-sidebar/50 bg-sidebar!',
                      pathname === item.to && 'bg-linear-to-r/oklch border-[#5D6B68]/10',
                    )}
                    isActive={pathname === item.to}
                  >
                    <Link to={item.to}>
                      <item.icon className='size-5!' />
                      <span className='text-base font-medium tracking-tight'>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='text-white'>
        {/* <DashboardTrial />
        <DashboardUserButton /> */}
        <UserBox />
      </SidebarFooter>
    </Sidebar>
  )
}
