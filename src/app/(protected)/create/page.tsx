'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import useRefetch from '@/hooks/use-refetch'

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>();
    const createProject = api.project.createProject.useMutation();
    const refetch = useRefetch();

    const onSubmit = (data: FormInput) => {
        createProject.mutate({
            name: data.projectName,
            githubUrl: data.repoUrl,
            githubToken: data.githubToken,
        }, {
            onSuccess: () => {
                toast.success('Project created successfully');
                refetch();
                reset();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
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
                        <Button type='submit' disabled={createProject.isPending}>Check Project</Button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreatePage
