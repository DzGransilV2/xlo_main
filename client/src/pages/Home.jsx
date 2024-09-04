import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { hostname } from '../config';

const Home = () => {
  // State to hold posts data
  const [posts, setPosts] = useState([]);


  // const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
  const token = JSON.parse(localStorage.getItem('token'));
  // console.log(token);
  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${hostname}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // useEffect to fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='w-full flex flex-col gap-5 flex-wrap'>
      <span className='font-semibold text-2xl'>Fresh recommendations</span>
      <div className='flex gap-5 flex-wrap'>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Card key={index} post={post} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default Home;
