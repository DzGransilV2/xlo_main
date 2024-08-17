import React from 'react'
import Form from '../components/Form'

const Post = () => {
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <div className='container h-full flex flex-col'>
                <span>Post your Ad</span>
                <span>Cars, Mobiles and Bikes</span>
                <Form/>
            </div>
        </div>
    )
}

export default Post
