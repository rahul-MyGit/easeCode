'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Dialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
import Image from 'next/image'
import React, { useState } from 'react'
import { askQuestion } from './action'
import { readStreamableValue } from 'ai/rsc'
import  MDEditor  from '@uiw/react-md-editor'
import CodeReferences from './CodeReferences'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

// INput , text fied, TextINputdata => value | textINput => stack [text | INput ]
// Action for User => [] =>
const askQuestionCard = () => {
  const { project } = useProject()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileReferences, setFileReferences] = useState<{fileName: string, sourcecode: string, summary: string}[]>([])
  const [answer, setAnswer] = useState('')
  const saveAnswer = api.project.savedAnswer.useMutation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer('');
    setFileReferences([]);
    e.preventDefault()
    if(!project?.id) return;
    setLoading(true);

    const {output, fileReferences} = await askQuestion(question, project.id);
    setOpen(true);

    setFileReferences(fileReferences);


    for await (const delta of readStreamableValue(output)){
      if(delta) {
        setAnswer(ans => ans + delta);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[80vw]'>
        <DialogHeader>
          <div className="flex items-center ep-2">
          <DialogTitle>
            <Image src='/logo.png' alt='logo' width={40} height={40} />
          </DialogTitle>
          <Button variant='outline' disabled={saveAnswer.isPending} type='button' onClick={() => {
            saveAnswer.mutate({
              question, 
              answer,
              fileReferences,
              projectId: project!.id
              }, {
                onSuccess: () => {
                  toast.success('Answer saved')
                },
                onError: (error) => {
                  toast.error(error.message)
                }
              })}}>Save Answer</Button>
          </div>
        </DialogHeader>
        <MDEditor.Markdown source={answer} className='max-w-[70vw] -full max-h-[40vh] overflow-scroll' />
        <CodeReferences fileReferences={fileReferences} />
        <Button variant='outline' type='button' onClick={() => {setOpen(false)}}>Close</Button>
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
            <Button type='submit' disabled={loading} >
              Ask easeCode
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default askQuestionCard


