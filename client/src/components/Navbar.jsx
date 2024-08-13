import React from 'react'
import { ReactComponent as HomeIcon } from '../assets/svg/HomeSVG.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/LocationSVG.svg';
import { ReactComponent as CategoriesIcon } from '../assets/svg/CategoriesSVG.svg';
import { ReactComponent as UserIcon } from '../assets/svg/UserSVG.svg';

const Navbar = () => {
  return (
    <nav className='bg-myGrey rounded-[0.625rem]'>
      <ul className='flex flex-col gap-5 p-5'>
        <li className='flex items-center justify-start gap-3'><HomeIcon height={24} width={24}/><span>Home</span></li>
        <li className='flex items-center justify-start gap-3'><LocationIcon height={24} width={24}/><span>Location</span></li>
        <li className='flex items-center justify-start gap-3'><CategoriesIcon height={24} width={24}/><span>Categories</span></li>
        <li className='flex items-center justify-start gap-3'><UserIcon height={24} width={24}/><span>User</span></li>
      </ul>
    </nav>
  )
}

export default Navbar
