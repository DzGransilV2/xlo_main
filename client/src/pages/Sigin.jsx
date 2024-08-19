import React from 'react'
import Footer from '../components/Footer'
import Login from '../components/Login'
import { ReactComponent as HomeIcon } from '../assets/svg/HomeSVG.svg';
import { Link } from 'react-router-dom';

const Credential = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
            <section className='container relative w-full h-full flex flex-col items-center justify-center gap-5'>
                    <div className='w-full flex absolute top-[10%]'>
                        <Link to='/' className='bg-myGrey px-4 h-[3.125rem] flex items-center justify-center gap-[0.3125rem] rounded-[0.625rem] hover:shadow-myShadow hover:cursor-pointer'>
                            <span>
                                <HomeIcon width={20} height={20}/>
                            </span>
                            <span className='font-medium text-base'>Home</span>
                        </Link>
                    </div>
                    <Login/>
                    <div className='absolute w-full bottom-0'>
                        <Footer />
                    </div>
            </section>
        </div>
  )
}

export default Credential
