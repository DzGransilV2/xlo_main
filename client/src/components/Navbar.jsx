import React from 'react'
import { ReactComponent as HomeIcon } from '../assets/svg/HomeSVG.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/LocationSVG.svg';
import { ReactComponent as CategoriesIcon } from '../assets/svg/CategoriesSVG.svg';
import { ReactComponent as UserIcon } from '../assets/svg/UserSVG.svg';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><HomeIcon height={24} width={24}/><span>Home</span></li>
        <li><LocationIcon height={24} width={24}/><span>Location</span></li>
        <li><CategoriesIcon height={24} width={24}/><span>Categories</span></li>
        <li><UserIcon height={24} width={24}/><span>User</span></li>
      </ul>
    </nav>
  )
}

export default Navbar
