import React from 'react'

const CardDetails = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <div className='flex gap-5'>
        <div>Image</div>
        <div>Image Grid</div>
      </div>
      <div className='flex gap-5'>
        <div>Title</div>
        <div>Price</div>
      </div>
      <div className='flex gap-5'>
        <div>Description</div>
        <div>Location</div>
      </div>
      <div className='flex'>Related</div>
    </div>
  )
}

export default CardDetails
