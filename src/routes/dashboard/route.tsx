import { SidebarProvider } from '#/components/ui/sidebar'
import { getSessionFn } from '#/features/auth/utils/function'
import Navbar from '#/features/dashboard/components/navbar'
import Sidebar from '#/features/dashboard/components/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  loader: () => getSessionFn(),
})

function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar />

      <main className='flex flex-col w-screen h-screen bg-muted'>
        <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
