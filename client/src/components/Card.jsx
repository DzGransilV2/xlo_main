import React from 'react'

const Card = () => {
    return (
        <div className='h-[18.75rem] w-[18rem] relative overflow-hidden rounded-[0.625rem] hover:shadow-myShadow'>
            <div className='bg-slate-600 w-full flex items-center justify-center overflow-hidden' style={{ height: 'calc(18.75rem - 5.7rem)' }}>
                <img src="https://picsum.photos/seed/picsum/200/300" alt="random" className='h-full'/>
            </div>
            <div className='w-full h-[8.6875rem] absolute top-[50.45%]'>
                <div className='w-full absolute top-[10%]'>
                    <div className='w-[8.125rem] h-12 bg-myPriceTag rounded-t-[0.625rem] font-semibold text-2xl flex justify-center relative'>
                        <span className='h-[1.875rem] flex items-center justify-center absolute top-[5%]'>₹000000</span>
                    </div>
                </div>
                <div className='w-full h-[6.25rem] absolute top-[34.9%] bg-myGrey rounded-[0.625rem] px-5 py-[0.625rem] flex flex-col gap-2'>
                    <span className='font-bold text-base'>Title...</span>
                    <span className='font-normal text-base'>Location...</span>
                    <span className='font-thin text-xs self-end'>5 Days Ago</span>
                </div>
            </div>
        </div>
    )
}

export default Card
