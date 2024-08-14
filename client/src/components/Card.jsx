import React from 'react'

const Card = () => {
    return (
        <div className='bg-slate-600 h-[18.75rem] w-[18rem] relative overflow-hidden rounded-[0.625rem] hover:shadow-myShadow'>
            <div className='w-full flex items-center justify-center overflow-hidden' style={{ height: 'calc(18.75rem - 7.0625rem)' }}>
                <img src="https://picsum.photos/seed/picsum/200/300" alt="random" className='h-full'/>
            </div>
            <div className='w-full h-[8.6875rem] absolute top-[50.45%]'>
                <div className='w-full'>
                    <div className='w-[8.125rem] h-12 bg-white rounded-t-[0.625rem]'>$000000</div>
                </div>
                <div className='w-full h-[87%] absolute top-[20%] bg-myGrey rounded-[0.625rem]'>Desc</div>
            </div>
        </div>
    )
}

export default Card
