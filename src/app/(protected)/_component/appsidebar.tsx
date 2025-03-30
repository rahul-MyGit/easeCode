'use client'

import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Bot, Calendar, CreditCard, LayoutDashboard, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useProject from '@/hooks/use-project'


const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Q&A',
    url: "/qa",
    icon: Bot,
  },
  {
    title: 'Meetings',
    url: "/meetings",
    icon: Calendar,
  },
  {
    title: 'Billing',
    url: "/billing",
    icon: CreditCard,
  },
]



export default function AppSidebar() {

  const pathname = usePathname();
  const { open, setOpen, state } = useSidebar();
  const { projects, projectId, setProjectId } = useProject();

  // Function to determine if tooltips should be shown
  const shouldShowTooltip = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" variant='floating'>
      <SidebarHeader>
        <div className='flex items-center gap-2'>
          <Image src='/logo.png' alt='logo' width={32} height={32} />
          {
            open && (
              <h1 className='text-xl font-bold text-primary/80'>
                codeSearch
              </h1>
            )
          }
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={item.url} className={cn({
                            '!bg-primary !text-white': pathname === item.url
                          }, 'list-none')}>
                            <item.icon className="flex-shrink-0" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {shouldShowTooltip && (
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Your Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((proj) => {
                return (
                  <SidebarMenuItem key={proj.name}>
                        <SidebarMenuButton asChild>
                          <div onClick={() => setProjectId(proj.id)}>
                            <div className={cn(
                              'rounded-sm border size-6 flex items-center justify-center rexr-sm bg-white text-primary flex-shrink-0',
                              {
                                'bg-primary text-white': proj.id === projectId
                              }
                            )}>
                              {proj.name[0]}
                            </div>
                            <span className={cn(proj.id === projectId ? 'text-purple-500' : '')}>{proj.name}</span>
                          </div>
                        </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
              <div className="h-2"></div>
              <SidebarMenuItem>
                    <Link href='/create'>
                      <Button size='sm' variant={'outline'} className='w-fit'>
                        <Plus className="flex-shrink-0" />
                        <span className={cn(shouldShowTooltip ? 'sr-only' : '')}>Add Project</span>
                      </Button>
                    </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


      </SidebarContent>
      sidebar here
    </Sidebar>
  )
}
