import React from 'react'
import { ReactComponent as SaveIcon } from '../assets/svg/SaveSVG.svg';
import { useNavigate } from 'react-router-dom';

const Card = ({post}) => {

    const navigate = useNavigate();
    if (!post) return null;
    const id = post._id;
    const cardClick = () => {
        navigate(`/card/${id}`);
    }

    return (
        <div onClick={cardClick} className='h-[18.75rem] w-[18rem] relative overflow-hidden rounded-myRound hover:shadow-myShadow'>
            <div className='bg-slate-600 w-full flex items-center justify-center overflow-hidden' style={{ height: 'calc(18.75rem - 5.7rem)' }}>
                <div className='absolute top-5 right-5 bg-myGrey rounded-full h-[1.875rem] w-[1.875rem] flex items-center justify-center'>
                    <SaveIcon height={24} width={24} />
                </div>
                <img src={post.propics[0]} alt="thumbnail" className='h-full'/>
            </div>
            <div className='w-full h-[8.6875rem] absolute top-[50.45%]'>
                <div className='w-full absolute top-[10%]'>
                    <div className='w-[8.125rem] h-12 bg-myPriceTag rounded-t-[0.625rem] font-semibold text-2xl flex justify-center relative'>
                        <span className='h-[1.875rem] flex items-center justify-center absolute top-[5%]'>₹{post.price}</span>
                    </div>
                </div>
                <div className='w-full h-[6.25rem] absolute top-[34.9%] bg-myGrey rounded-myRound px-5 py-[0.625rem] flex flex-col gap-2'>
                    <span className='font-bold text-base'>{post.title}</span>
                    <span className='font-normal text-base'>{post.location.state}</span>
                    <span className='font-thin text-xs self-end'>5 Days Ago</span>
                </div>
            </div>
        </div>
    )
}

export default Card
