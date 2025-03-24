import { Input } from '@/components/ui/input'
import React from 'react'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mt-14'>
        <Input type="text" />
        {children}
    </div>
  )
}

export default SidebarLayout