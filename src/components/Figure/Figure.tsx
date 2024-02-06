import React from 'react'

const Figure : React.FunctionComponent = () => {
  return (
    <div className='text-3xl my-8 border-2 w-2/3 h-full relative flex justify-center'>
       

     {/* vertical line  */}
     <div className='w-2 bg-white h-full mr-24 relative' />
     <div className='h-2 w-48 bg-white absolute top-8 ml-2'/>
     <div className='w-2 h-12 bg-white top-8 absolute ml-48'/>
     <div className='w-12 h-12 rounded-full border-color-white border-4 absolute top-20 ml-48 -mt-0.5'/>
     <div className='w-1 h-20 bg-white absolute ml-48 mt-[calc(8rem-3px)]'/>
     <div className='h-1 w-12 bg-white absolute top-40 ml-[calc(192px+48px)] -rotate-45 origin-left'/>
     <div className='h-1 w-12 bg-white absolute top-40 ml-[calc(192px-48px)] rotate-45 origin-right'/>

     

    </div>
  )
}

export default Figure