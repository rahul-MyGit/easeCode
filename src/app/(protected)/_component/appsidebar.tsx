'use client'

import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Bot, Calendar, CreditCard, LayoutDashboard, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'


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

const projects = [
  {
    name: 'Project 1',

  },
  {
    name: 'Project 2',
  },
  {
    name: 'Project 3',
  },
]

export default function AppSidebar() {

  const pathname = usePathname();
  const { open, setOpen, state } = useSidebar();

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
            your Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((proj) => {
                return (
                  <SidebarMenuItem key={proj.name}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div>
                            <div className={cn(
                              'rounded-sm border size-6 flex items-center justify-center rexr-sm bg-white text-primary flex-shrink-0',
                              {
                                'bg-primary text-white': true // TODO: change to projectName === proj.id
                              }
                            )}>
                              {proj.name[0]}
                            </div>
                            <span>{proj.name}</span>
                          </div>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {shouldShowTooltip && (
                        <TooltipContent side="right">
                          {proj.name}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                )
              })}
              <div className="h-2"></div>
              <SidebarMenuItem>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link href='/create'>
                      <Button size='sm' variant={'outline'} className='w-fit'>
                        <Plus className="flex-shrink-0" />
                        <span className={cn(shouldShowTooltip ? 'sr-only' : '')}>Add Project</span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {shouldShowTooltip && (
                    <TooltipContent side="right">
                      Add Project
                    </TooltipContent>
                  )}
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


      </SidebarContent>
      sidebar here
    </Sidebar>
  )
}
