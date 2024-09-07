import React, {useEffect, useState} from 'react';
import { ReactComponent as HomeIcon } from '../assets/svg/HomeSVG.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/LocationSVG.svg';
import { ReactComponent as CategoriesIcon } from '../assets/svg/CategoriesSVG.svg';
import { ReactComponent as UserIcon } from '../assets/svg/UserSVG.svg';
import '../styles/navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  // const handleSetActiveLink = (link) => {
  //   setActiveLink(link);
  // };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/home') {
      setActiveLink('home');
    } else if (path === '/profile') {
      setActiveLink('profile');
    }
  }, [location]);

  return (
    <nav className='navbar bg-myGrey md:border-none border-2 border-white rounded-[0.625rem] md:shadow-none shadow-myShadow group'>
      <ul className='flex flex-row md:flex-col gap-5 p-[0.5rem]'>
        {/* onClick={()=>handleSetActiveLink('home')} */}
        <li className={`nav-item text-hover ${activeLink==='home'?'active': ''}`}>
          <Link to='/home' className='nav-item'>
            <span><HomeIcon height={24} width={24} /></span>
            <span className='nav-text'>Home</span>
          </Link>
        </li>
        {/* onClick={()=>handleSetActiveLink('location')} */}
        <li className={`nav-item text-hover ${activeLink==='location'?'active': ''}`}>
          <Link className='nav-item'>
            <span><LocationIcon height={24} width={24} /></span>
            <span className='nav-text'>Location</span>
          </Link>
        </li>
        {/* onClick={()=>handleSetActiveLink('categories')}  */}
        <li className={`nav-item text-hover ${activeLink==='categories'?'active': ''}`}>
          <Link className='nav-item'>
            <span><CategoriesIcon height={24} width={24} /></span>
            <span className='nav-text'>Categories</span>
          </Link>
        </li>
        {/* onClick={()=>handleSetActiveLink('profile')} */}
        <li className={`nav-item text-hover ${activeLink==='profile'?'active': ''}`}>
          <Link to={`/profile`} className='nav-item'>
            <span><UserIcon height={24} width={24} /></span>
            <span className='nav-text'>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
