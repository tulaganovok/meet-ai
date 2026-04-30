import { SidebarProvider } from '#/components/ui/sidebar'
import { getSessionFn } from '#/features/auth/utils/function'
import DashboardNavbar from '#/features/dashboard/components/dashboard-navbar'
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
        <DashboardNavbar />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
