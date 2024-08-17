import React from 'react'
import Form from '../components/Form'
import { ReactComponent as ArrowBackIcon } from '../assets/svg/ArrowBackSVG.svg';

const Post = () => {
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <section className='container h-full flex flex-col items-center justify-center gap-5'>
                {/* <span>Cars, Mobiles and Bikes</span> */}
                    <div className='w-full flex'>
                        <button className='bg-myGrey px-4 h-[3.125rem] flex items-center justify-center gap-[0.3125rem] rounded-[0.625rem] hover:shadow-myShadow hover:cursor-pointer'>
                            <span>
                                <ArrowBackIcon width={24} height={24}/>
                            </span>
                            <span className='font-medium text-base'>Back</span>
                        </button>
                    </div>
                    <span className='font-bold text-2xl'>Post</span>
                    <Form />
            </section>
        </div>
    )
}

export default Post
