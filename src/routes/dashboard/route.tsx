import { SidebarProvider } from '#/components/ui/sidebar'
import { getSessionFn } from '#/features/auth/functions/session'
import DashboardSidebar from '#/features/dashboard/components/dashboard-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: () => getSessionFn(),
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className='flex flex-col w-screen h-screen bg-muted'>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
