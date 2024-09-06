import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { hostname } from '../config';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const token = JSON.parse(localStorage.getItem('token'));

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${hostname}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='w-full flex flex-col gap-5 flex-wrap'>
      <span className='font-semibold text-2xl'>Fresh recommendations</span>
      <div className='flex gap-5 justify-center flex-wrap'>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Card key={index} post={post} />
          ))
        ) : (
          <div className=" inset-0 flex items-center justify-center bg-white">
            <div className="spinner border-t-4 border-black rounded-full w-16 h-16 animate-spin"></div>
            <p className="ml-4">Loading...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
