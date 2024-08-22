import React from 'react'
import Card from '../components/Card'
import { Link, useNavigate } from 'react-router-dom'
import ProfileCard from '../components/ProfileCard';

const Profile = () => {

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      {auth ?
        <ProfileCard logout={logout} />
        :
        <div className='h-full flex flex-col items-center justify-center gap-5'>
          <span>Login to View Profile</span>
          <Link to='/login' className='bg-myGrey flex items-center justify-center font-semibold text-base p-[9px] rounded-myRound w-[119px]'>Login</Link>
        </div>
      }
    </>
  )
}

export default Profile
