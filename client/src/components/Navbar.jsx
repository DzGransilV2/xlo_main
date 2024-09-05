import React, {useState} from 'react';
import { ReactComponent as HomeIcon } from '../assets/svg/HomeSVG.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/LocationSVG.svg';
import { ReactComponent as CategoriesIcon } from '../assets/svg/CategoriesSVG.svg';
import { ReactComponent as UserIcon } from '../assets/svg/UserSVG.svg';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [activeLink, setActiveLink] = useState('');

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  // const user = localStorage.getItem("user");
  // const userObj = JSON.parse(user);
  // const id = userObj._id;

  return (
    <nav className='navbar bg-myGrey md:border-none border-2 border-white rounded-[0.625rem] group'>
      <ul className='flex flex-row md:flex-col gap-5 p-[0.5rem]'>
        <li className={`nav-item text-hover ${activeLink==='home'?'active': ''}`}>
          <Link onClick={()=>handleSetActiveLink('home')} to='/home' className='nav-item'>
            <span><HomeIcon height={24} width={24} /></span>
            <span className='nav-text'>Home</span>
          </Link>
        </li>
        <li className={`nav-item text-hover ${activeLink==='location'?'active': ''}`}>
          <Link onClick={()=>handleSetActiveLink('location')} className='nav-item'>
            <span><LocationIcon height={24} width={24} /></span>
            <span className='nav-text'>Location</span>
          </Link>
        </li>
        <li className={`nav-item text-hover ${activeLink==='categories'?'active': ''}`}>
          <Link onClick={()=>handleSetActiveLink('categories')} className='nav-item'>
            <span><CategoriesIcon height={24} width={24} /></span>
            <span className='nav-text'>Categories</span>
          </Link>
        </li>
        <li className={`nav-item text-hover ${activeLink==='profile'?'active': ''}`}>
          <Link onClick={()=>handleSetActiveLink('profile')} to={`/profile`} className='nav-item'>
            <span><UserIcon height={24} width={24} /></span>
            <span className='nav-text'>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
