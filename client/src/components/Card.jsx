import React from 'react'

const Card = () => {
    return (
        <div className='bg-myGrey h-[18.75rem] w-[18rem] rounded-[0.625rem] hover:shadow-myShadow'>
            <div className='w-full' style={{ height: 'calc(18.75rem - 8.6875rem)' }}>IMAGE</div>
            <div className='w-full h-[8.6875rem]'>DESCRIPTION</div>
        </div>
    )
}

export default Card
