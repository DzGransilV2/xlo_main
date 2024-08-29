import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { hostname } from '../config';
import Card from './Card';

const ProfileCard = ({ logout }) => {

  const [post, setPost] = React.useState([]);

  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);

  // console.log(userObject._id)

  const share = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${hostname}/postsUser`, {
          params: { uid: userObject._id }
        });
        // console.log(response.data);
        if (response.data.status) {
          setPost(response.data.result);
        } else {
          setPost(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [hostname, userObject._id]);
  

  return (
    <div className='w-full h-auto flex flex-col gap-[100px] items-center'>
      <div className='flex gap-5'>
        <div className='w-[130px] h-[130px] bg-myGrey rounded-full flex items-center justify-center overflow-hidden'>
          <img src={userObject.userpic} alt="pro-pic" className='w-full' />
        </div>
        <div className='flex flex-col justify-center gap-[10px]'>
          <span className='font-semibold text-2xl'>{userObject.uname}</span>
          {/* <span className='font-normal text-base'>{userObject.email}</span> */}
          <span className='font-normal text-base'>Member since Aug 2024</span>
          <span className='flex gap-5'>
            <button onClick={share} className='bg-myGrey font-semibold text-base p-[9px] rounded-myRound w-[119px]'>Share Profile</button>
            <Link onClick={logout} className='bg-myGrey flex items-center justify-center font-semibold text-base p-[9px] rounded-myRound w-[119px]'>Logout</Link>
          </span>
        </div>
      </div>
      <div className='flex flex-wrap h-auto gap-5'>
        {post && post.length > 0 ? (
          post.map((item, index) => (
            <Card key={index} post={item} />
          ))
        ) : (
          <span className='font-semibold text-xl'>You haven&apos;t listed anything yet</span>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
