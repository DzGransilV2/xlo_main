import React from 'react'
import { ReactComponent as ArrowDownIcon } from '../assets/svg/ArrowDownSVG.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/svg/ArrowUpSVG.svg';
import Card from '../components/Card';

const CardDetails = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-auto'>
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
      {/* h-[155px] now its auto  */}
        <div className='w-[829px] h-auto flex flex-col gap-5 bg-myGrey rounded-myRound px-5 py-[15px]'>
          <div>
            <span className='font-bold text-2xl'>Fortuner Toyota (Title)</span>
          </div>
          <div className='flex flex-wrap gap-5'>
            <div className='flex gap-[5px] items-center justify-center text-xl'>
              <span className='font-semibold'>Owner:</span><span className='font-normal'>1st</span>
            </div>
            <div className='flex gap-[5px] items-center justify-center text-xl'>
              <span className='font-semibold'>Location:</span><span className='font-normal'>Mangaluru</span>
            </div>
            <div className='flex gap-[5px] items-center justify-center text-xl'>
              <span className='font-semibold'>Posted:</span><span className='font-normal'>15-08-2024</span>
            </div>
            <div className='flex gap-[5px] items-center justify-center text-xl'>
              <span className='font-semibold'>Fuel:</span><span className='font-normal'>Petrol</span>
            </div>
            <div className='flex gap-[5px] items-center justify-center text-xl'>
              <span className='font-semibold'>Mileage:</span><span className='font-normal'>45,000 km</span>
            </div>
            <div className='flex gap-[5px] items-center justify-center text-xl'>
              <span className='font-semibold'>Transmission:</span><span className='font-normal'>Manual</span>
            </div>
            <div className='flex gap-[5px] items-center justify-center text-xl'>
              <span className='font-semibold'>Manufactured:</span><span className='font-normal'>18-05-2020</span>
            </div>
          </div>
        </div>
        <div className='w-[431px] h-[155px] bg-myGrey rounded-myRound flex flex-col items-center justify-center gap-5 py-[30px] px-[95px]'>
          <span className='font-bold text-2xl'>₹ 11,99,999</span>
          <button className='w-[240px] h-10 rounded-myRound bg-white font-semibold text-base px-14 py-2'>Chat with Seller</button>
        </div>
      </div>
      <div className='flex gap-5 text-xl'>
      {/* h-[565px] now its auto */}
        <div className='px-5 py-[15px] w-[829px] h-auto flex flex-col gap-5 bg-myGrey rounded-myRound'>
          <span className='font-semibold'>Description</span>
          <span className='font-normal'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatem adipisci illum deserunt unde dolores? Vel iure, assumenda quo aut nesciunt repudiandae et commodi cupiditate quia illum nihil voluptates inventore?
          </span>
        </div>
        <div className='w-[431px] h-[306px] bg-myGrey rounded-myRound'>Location</div>
      </div>
      <div className='flex flex-col flex-wrap gap-5 w-[1280px] h-auto rounded-myRound mt-5'>
        <span className='font-semibold text-xl'>Related</span>
        <Card/>
      </div>
    </div>
  )
}

export default CardDetails
