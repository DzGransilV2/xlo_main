import React from 'react'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'

const Header = () => {


    return (
        <div className='sticky top-0 z-[2]'>
            <header className='bg-myBackground h-[13.0625rem] flex items-center justify-between font-myPoppins relative'>
                <div className='flex items-center justify-between w-full gap-5 absolute top-[3.125rem]'>
                    <Link to='/'>
                        <div className='font-black text-4xl'>
                            <h1>XLO</h1>
                        </div>
                    </Link>
                    <div className='w-[60rem] h-[3.125rem] flex items-center justify-center'>
                        {/* <input className='w-full h-full rounded-[0.625rem] p-5' type="text" name="" id="" placeholder='Type here to search...'/> */}
                        <Searchbar />
                    </div>
                    <Link to='/post' className='bg-myGrey px-4 h-[3.125rem] flex items-center justify-center gap-[0.3125rem] rounded-[0.625rem] hover:shadow-myShadow hover:cursor-pointer'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m21.4 14.25l-7.15 7.15q-.3.3-.675.45t-.75.15t-.75-.15t-.675-.45l-8.825-8.825q-.275-.275-.425-.637T2 11.175V4q0-.825.588-1.412T4 2h7.175q.4 0 .775.163t.65.437l8.8 8.825q.3.3.438.675t.137.75t-.137.738t-.438.662M12.825 20l7.15-7.15L11.15 4H4v7.15zM6.5 8q.625 0 1.063-.437T8 6.5t-.437-1.062T6.5 5t-1.062.438T5 6.5t.438 1.063T6.5 8m5.5 4"></path></svg>
                        </span>
                        <span className='font-medium text-[1.5rem]'>Sell</span>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header
