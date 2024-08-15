import React from 'react'
import { ReactComponent as ArrowDownIcon } from '../assets/svg/ArrowDownSVG.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/svg/ArrowUpSVG.svg';

const CardDetails = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full'>
      <div className='flex gap-5'>
        <div className='w-[829px] h-[490px] bg-myGrey rounded-myRound'>Image</div>
        <div className='w-[431px] h-[490px] rounded-myRound flex gap-5'>
            <div className='flex flex-wrap gap-5'>
                <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
                <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
                <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
                <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
                <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
            </div>
            <div className='flex flex-col justify-between'>
                <div className='rounded-full w-[50px] h-[50px] bg-myGrey flex items-center justify-center'><ArrowUpIcon height={24} width={24}/></div>
                <div className='rounded-full w-[50px] h-[50px] bg-myGrey flex items-center justify-center'><ArrowDownIcon height={24} width={24}/></div>
            </div>
        </div>
      </div>
      <div className='flex gap-5'>
        <div className='w-[829px] h-[155px] bg-myGrey rounded-myRound'>Title</div>
        <div className='w-[431px] h-[155px] bg-myGrey rounded-myRound'>Price</div>
      </div>
      <div className='flex gap-5'>
        <div className='w-[829px] h-[565px] bg-myGrey rounded-myRound'>Description</div>
        <div className='w-[431px] h-[306px] bg-myGrey rounded-myRound'>Location</div>
      </div>
      <div className='flex gap-5 w-[1280px] h-[200px] bg-myGrey rounded-myRound'>Related</div>
    </div>
  )
}

export default CardDetails
