import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

interface InfoProps{
  boardId:string
}

const TabSeparator=()=>{
    return(
      <div className='text-neutral-300 px-1.5'>
        |
      </div>
    )
}

const Info = ({boardId}:InfoProps) => {
  const [title, setTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <div className='absolute top-2 left-2 bg-white px-1.5 h-12 w-auto flex items-center rounded-md shadow-md'>
      <span className='font-semibold text-xl ml-2 text-black'>
        BOARD
      </span>
      <TabSeparator/>
      <Button variant="board" className='text-base font-normal p-2'>
        Title
      </Button>
    </div>

  )
}

export default Info
