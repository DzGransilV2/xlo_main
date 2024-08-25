import React from 'react'
import { Link } from 'react-router-dom'

const ProfileCard = ({logout}) => {

  const user = localStorage.getItem("user")
  const userObject = JSON.parse(user)

  return (
    <div className='w-full h-auto flex flex-col gap-[100px] items-center'>
      <div className='flex gap-5'>
        <div className='w-[130px] h-[130px] bg-myGrey rounded-full'></div>
        <div className='flex flex-col justify-center gap-[10px]'>
          <span className='font-semibold text-2xl'>{userObject.uname}</span>
          {/* <span className='font-normal text-base'>{userObject.email}</span> */}
          <span className='font-normal text-base'>Member since Aug 2024</span>
          <span className='flex gap-5'>
            <button className='bg-myGrey font-semibold text-base p-[9px] rounded-myRound w-[119px]'>Share Profile</button>
            <Link onClick={logout} className='bg-myGrey flex items-center justify-center font-semibold text-base p-[9px] rounded-myRound w-[119px]'>Logout</Link>
          </span>
        </div>
      </div>
      <div className='flex flex-wrap h-auto gap-5'>
        <span className='font-semibold text-xl'>You haven&apos;t listed anything yet</span>
      </div>
    </div>
  )
}

export default ProfileCard
