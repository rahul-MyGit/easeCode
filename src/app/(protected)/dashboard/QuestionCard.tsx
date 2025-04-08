'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Dialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
import Image from 'next/image'
import React, { useState } from 'react'

const askQuestionCard = () => {
  const { project } = useProject()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Image src='/logo.png' alt='logo' width={40} height={40} />
          </DialogTitle>
        </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card className='relative col-span-3'>
        <CardHeader>
          <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea placeholder='which file should I edit to change the home page' value={question} onChange={(e) => setQuestion(e.target.value)} />
            <div className='h-4'></div>
            <Button type='submit' >
              Ask easeCode
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default askQuestionCard
