import React from 'react';
import { ReactComponent as HomeIcon } from '../assets/svg/HomeSVG.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/LocationSVG.svg';
import { ReactComponent as CategoriesIcon } from '../assets/svg/CategoriesSVG.svg';
import { ReactComponent as UserIcon } from '../assets/svg/UserSVG.svg';
import '../styles/navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <nav className='navbar bg-myGrey rounded-[0.625rem] group'>
      <ul className='flex flex-col gap-5 p-5'>
        <li className='nav-item'>
          <span><HomeIcon height={24} width={24} /></span>
          <span className='nav-text'>Home</span>
        </li>
        <li className='nav-item'>
          <span><LocationIcon height={24} width={24} /></span>
          <span className='nav-text'>Location</span>
        </li>
        <li className='nav-item'>
          <span><CategoriesIcon height={24} width={24} /></span>
          <span className='nav-text'>Categories</span>
        </li>
        <li className='nav-item'>
          <span><UserIcon height={24} width={24} /></span>
          <span className='nav-text'>User</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
