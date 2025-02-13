import React from 'react'

const Toolbar = () => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2  flex flex-col gap-y-4'>
      <div className='bg-white rounded-md shadow-md p-1.5 flex gap-y-1 flex-col items-center'>
        <div>
            Pencil
        </div>
        <div>
            Square
        </div>
        <div>
            Circle
        </div>
        <div>
            Ellipse
        </div>

      </div>
      <div className='bg-white rounded-md shadow-md p-1.5 flex gap-y-1 flex-col items-center'>
        <div>
            Undo
        </div>
        <div>
            Redo
        </div>
        </div>
    </div>
  )
}

export default Toolbar
