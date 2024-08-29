import React, { useEffect, useState, useRef } from 'react'
import { ReactComponent as ArrowDownIcon } from '../assets/svg/ArrowDownSVG.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/svg/ArrowUpSVG.svg';
import Card from '../components/Card';

// import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

// import { Viewer } from "gle-gaussian-splat-3d";

import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import axios from 'axios';
import { hostname } from '../config';
import { useParams } from 'react-router-dom';


const CardDetails = () => {

  // const [loading, setLoading] = useState(false);
  // const [viewer, setViewer] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMainImg, setNewMainImg] = useState(null);

  useEffect(() => {
    if (post && post.propics && post.propics.length > 0) {
      setNewMainImg(post.propics[0]);
    }
  }, [post]);

  const { id } = useParams();

  const canvasRef = useRef(null);


  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${hostname}/posts/${id}`);
        setPost(response.data);
        // console.log(post)
      } catch (err) {
        console.error('Error fetching post data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  if (loading) return <p className='flex items-center justify-center'>Loading...</p>;
  if (error) return <p className='flex items-center justify-center text-red-600'>Error loading post details.</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const manufacturedDate = formatDate(post.manufactured);
  const postedDate = formatDate(post.createdAt);


  // useEffect(() => {
  //   const canvas = canvasRef.current;

  //   if (!canvas) return;

  //   // Initialize the viewer
  //   const viewer = new GaussianSplats3D.Viewer({
  //     canvas,
  //     'cameraUp': [0, -1, -0.6],
  //     'initialCameraPosition': [-1, -4, 6],
  //     'initialCameraLookAt': [0, 4, 0]
  //   });

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok: ' + response.statusText);
  //       }
  //       const data = await response.arrayBuffer();
  //       console.log('Data loaded:', data.byteLength);

  //       if (!(data instanceof ArrayBuffer) || data.byteLength < 1000) {
  //         throw new Error('Invalid data received or data too small');
  //       }

  //       await viewer.addSplatScene(data, {
  //         'splatAlphaRemovalThreshold': 5,
  //         'showLoadingUI': true,
  //         'position': [0, 1, 0],
  //         'rotation': [0, 0, 0, 1],
  //         'scale': [1.5, 1.5, 1.5]
  //       });
  //       viewer.start();
  //     } catch (error) {
  //       console.error("Error loading or processing splat file:", error);
  //     }
  //   };

  //   fetchData();

  //   const handleResize = () => {
  //     if (canvas) {
  //       viewer.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const storeURL = (pic) => {
    setNewMainImg(pic);
  }

  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-auto'>
      {post && (
        <>
          <div className='flex gap-5'>
            <div className='w-[829px] h-[490px] flex items-center justify-center overflow-hidden bg-myGrey rounded-myRound'>
              {/* <canvas id="canvas" ref={canvasRef} className='w-full h-full'></canvas> */}
              <img className='h-full' src={newMainImg} alt="main-pic" />
            </div>
            <div className='w-[431px] h-[490px] rounded-myRound flex gap-5'>
              <div className='flex h-fit flex-wrap gap-5'>
                {post.propics.map((pic, index) => (
                  <div key={index} className='w-[150px] h-[150px] bg-myGrey rounded-myRound overflow-hidden'>
                    <img className='h-full w-full object-cover' onClick={() => storeURL(pic)} src={pic} alt={`sub-pic-${index}`} />
                  </div>
                ))}
              </div>
              {/* <div className='flex flex-col justify-between'>
                <div className='rounded-full w-[50px] h-[50px] bg-myGrey flex items-center justify-center'><ArrowUpIcon height={24} width={24} /></div>
                <div className='rounded-full w-[50px] h-[50px] bg-myGrey flex items-center justify-center'><ArrowDownIcon height={24} width={24} /></div>
              </div> */}
            </div>
          </div>
          <div className='flex gap-5'>
            {/* h-[155px] now its auto  */}
            <div className='w-[829px] h-auto flex flex-col gap-5 bg-myGrey rounded-myRound px-5 py-[15px]'>
              <div>
                <span className='font-bold text-2xl'>{post.title}</span>
              </div>
              <div className='flex flex-wrap gap-5'>
                <div className='flex gap-[5px] items-center justify-center text-xl'>
                  <span className='font-semibold'>Owner:</span><span className='font-normal'>{post.owner}</span>
                </div>
                <div className='flex gap-[5px] items-center justify-center text-xl'>
                  <span className='font-semibold'>Location:</span><span className='font-normal'>{post.location.city}</span>
                </div>
                <div className='flex gap-[5px] items-center justify-center text-xl'>
                  <span className='font-semibold'>Posted:</span><span className='font-normal'>{postedDate}</span>
                </div>
                <div className='flex gap-[5px] items-center justify-center text-xl'>
                  <span className='font-semibold'>Fuel:</span><span className='font-normal'>{post.fuel}</span>
                </div>
                <div className='flex gap-[5px] items-center justify-center text-xl'>
                  <span className='font-semibold'>Mileage:</span><span className='font-normal'>{post.mileage} km</span>
                </div>
                <div className='flex gap-[5px] items-center justify-center text-xl'>
                  <span className='font-semibold'>Transmission:</span><span className='font-normal'>{post.transmission}</span>
                </div>
                <div className='flex gap-[5px] items-center justify-center text-xl'>
                  <span className='font-semibold'>Manufactured:</span><span className='font-normal'>{manufacturedDate}</span>
                </div>
              </div>
            </div>
            <div className='w-[431px] h-[155px] bg-myGrey rounded-myRound flex flex-col items-center justify-center gap-5 py-[30px] px-[95px]'>
              <span className='font-bold text-2xl'>₹ {post.price}</span>
              <button className='w-[240px] h-10 rounded-myRound bg-white font-semibold text-base px-14 py-2'>Chat with Seller</button>
            </div>
          </div>
          <div className='flex gap-5 text-xl'>
            {/* h-[565px] now its auto */}
            <div className='px-5 py-[15px] w-[829px] break-words h-auto flex flex-wrap flex-col gap-5 bg-myGrey rounded-myRound'>
              <span className='font-semibold'>Description</span>
              <span className='font-normal'>
                {post.description}
              </span>
            </div>
            <div className='w-[431px] h-[306px] bg-myGrey rounded-myRound'>Location</div>
          </div>
          <div className='flex flex-col flex-wrap gap-5 w-[1280px] h-auto rounded-myRound mt-5'>
            <span className='font-semibold text-xl'>Related</span>
            <Card />
          </div>
        </>
      )}
    </div>
  )
}

export default CardDetails
