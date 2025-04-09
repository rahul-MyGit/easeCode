'use client'

import { Tabs } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { TabsContent } from '@radix-ui/react-tabs';
import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';


type Props = {
    fileReferences: {
        fileName: string;
        sourcecode: string;
        summary: string;
    }[]
}

const CodeReferences = ({fileReferences}: Props) => {

    const [tab, setTab] = useState(fileReferences[0]?.fileName);
    if(fileReferences.length === 0) return null;


  return (
    <div className='max-w-[70vw]'>
        <Tabs value={tab} onValueChange={setTab}>
            <div className='overflow-scroll flex gap-2 bg-gray-200 p-1 rounded-md'>
                {fileReferences.map((file) => (
                    <button key={file.fileName} onClick={() => setTab(file.fileName)} className={cn(`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground hover:bg-muted`,
                        {
                            'bg-primary text-primary-foreground': tab === file.fileName,
                        }
                    )}>
                        {file.fileName}
                    </button>
                ))}
            </div>
            {fileReferences.map((file) => (
                <TabsContent key={file.fileName} value={file.fileName}className='max-h-[40vh] overflow-scroll max-w-7xl rounded-md'>
                    <SyntaxHighlighter language='typescript' style={lucario}>
                        {file.sourcecode}
                    </SyntaxHighlighter>
                </TabsContent>
            ))}
        </Tabs>

    </div>
  )
}

export default CodeReferences