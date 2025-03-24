import { Input } from '@/components/ui/input'
import { SidebarProvider } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AppSidebar from './appsidebar/appsidebar'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className='w-full m-2'>
        <div className='flex items-center ap-2 border-sidebar-border rounded-md'>
          {/* <Searchbar /> */}
          <div className='ml-auto'></div>
          <UserButton />
        </div>

        <div className='h-4'></div>
        {/* main content */}
        <div className='border-sidebar-border bg-sidebar'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout