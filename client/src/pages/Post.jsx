import React from 'react'
import Form from '../components/Form'
import { ReactComponent as ArrowBackIcon } from '../assets/svg/ArrowBackSVG.svg';
import Footer from '../components/Footer'

const Post = () => {
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <section className='container relative w-full h-full flex flex-col items-center justify-center gap-5'>
                {/* <span>Cars, Mobiles and Bikes</span> */}
                    <div className='w-full flex absolute top-[10%]'>
                        <button className='bg-myGrey px-4 h-[3.125rem] flex items-center justify-center gap-[0.3125rem] rounded-[0.625rem] hover:shadow-myShadow hover:cursor-pointer'>
                            <span>
                                <ArrowBackIcon width={24} height={24}/>
                            </span>
                            <span className='font-medium text-base'>Back</span>
                        </button>
                    </div>
                    <span className='font-bold text-2xl'>Post</span>
                    <Form />
                    <div className='absolute w-full bottom-0'>
                        <Footer />
                    </div>
            </section>
        </div>
    )
}

export default Post
