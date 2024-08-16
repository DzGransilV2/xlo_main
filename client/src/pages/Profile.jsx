import React from 'react'
import Card from '../components/Card'

const Profile = () => {
  return (
    <div className='w-full h-auto flex flex-col gap-[100px] items-center'>
      <div className='flex gap-5'>
        <div className='w-[130px] h-[130px] bg-myGrey rounded-full'></div>
        <div className='flex flex-col gap-[10px]'>
            <span className='font-semibold text-2xl'>Username</span>
            <span className='font-normal text-base'>Member since Aug 2024</span>
            <button className='bg-myGrey font-semibold text-base p-[9px] rounded-myRound w-[119px]'>Share Profile</button>
        </div>
      </div>
      <div className='flex flex-wrap h-auto gap-5'>
        <span className='font-semibold text-xl'>You haven&apos;t listed anything yet</span>
      </div>
    </div>
  )
}

export default Profile