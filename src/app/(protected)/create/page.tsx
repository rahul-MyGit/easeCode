'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>()

    const onSubmit = (data: FormInput) => {
        window.alert(JSON.stringify(data, null, 2))
        return true;
    }

    return <>
        <div className='flex items-center gap-12 h-full justify-center'>
            <Image src="/21004063.jpg" alt="logo" className='h-56 w-auto' width={224} height={224} />
            <div className='w-1/2'>
                <div>
                    <h1 className='text-2xl font-semibold'>Link your GitHub repository</h1>
                    <p className='text-sm text-muted-foreground'>
                        Enter the URL of the GitHub repository you want to link to your project.
                    </p>
                </div>
                <div className="h-4"></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register('projectName', { required: true })} placeholder='Project Name' />
                        <div className="h-4"></div>
                        <Input {...register('repoUrl', { required: true })} placeholder='https://github.com/username/repository' type='url'/>
                        <div className="h-4"></div>
                        <Input {...register('githubToken')} placeholder='GitHub Token (optional)' />
                        <div className="h-4"></div>
                        <Button type='submit'>Check Project</Button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreatePage
