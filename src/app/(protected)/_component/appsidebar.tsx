'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Bot, Calendar, CreditCard, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AppSidebar() {

  const pathname = usePathname();

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
  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader>
        LOGO
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
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={cn({
                      '!bg-primary !text-white': pathname === item.url
                    },  '')}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      sidebar here
    </Sidebar>
  )
}
