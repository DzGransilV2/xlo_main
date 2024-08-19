import React from 'react'
import Footer from '../components/Footer'
import Login from '../components/Login'

const Credential = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
            <section className='container relative w-full h-full flex flex-col items-center justify-center gap-5'>
                    {/* <span className='font-bold text-2xl'>Login</span> */}
                        <Login/>
                    <div className='absolute w-full bottom-0'>
                        <Footer />
                    </div>
            </section>
        </div>
  )
}

export default Credential
