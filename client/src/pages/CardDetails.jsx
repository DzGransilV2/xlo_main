import React, {useEffect,useState,useRef} from 'react'
import { ReactComponent as ArrowDownIcon } from '../assets/svg/ArrowDownSVG.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/svg/ArrowUpSVG.svg';
import Card from '../components/Card';

// import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

// import { Viewer } from "gle-gaussian-splat-3d";

import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';


const CardDetails = () => {

  const [loading, setLoading] = useState(false);
  const [viewer, setViewer] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // Initialize the viewer
    const viewer = new GaussianSplats3D.Viewer({
      canvas,
      'cameraUp': [0, -1, -0.6],
      'initialCameraPosition': [-1, -4, 6],
      'initialCameraLookAt': [0, 4, 0]
    });

    const fetchData = async () => {
      try {
        const response = await fetch('https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat');
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.arrayBuffer();
        console.log('Data loaded:', data.byteLength);

        if (!(data instanceof ArrayBuffer) || data.byteLength < 1000) {
          throw new Error('Invalid data received or data too small');
        }

        await viewer.addSplatScene(data, {
          'splatAlphaRemovalThreshold': 5,
          'showLoadingUI': true,
          'position': [0, 1, 0],
          'rotation': [0, 0, 0, 1],
          'scale': [1.5, 1.5, 1.5]
        });
        viewer.start();
      } catch (error) {
        console.error("Error loading or processing splat file:", error);
      }
    };

    fetchData();

    const handleResize = () => {
      if (canvas) {
        viewer.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-auto'>
      <div className='flex gap-5'>
        <div className='w-[829px] h-[490px] overflow-hidden bg-myGrey rounded-myRound'>
          <canvas id="canvas" ref={canvasRef} className='w-full h-full'></canvas>
        </div>
        <div className='w-[431px] h-[490px] rounded-myRound flex gap-5'>
          <div className='flex flex-wrap gap-5'>
            <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
            <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
            <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
            <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
            <div className='w-[150px] h-[150px] bg-myGrey rounded-myRound'>Image</div>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='rounded-full w-[50px] h-[50px] bg-myGrey flex items-center justify-center'><ArrowUpIcon height={24} width={24} /></div>
            <div className='rounded-full w-[50px] h-[50px] bg-myGrey flex items-center justify-center'><ArrowDownIcon height={24} width={24} /></div>
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
        <Card />
      </div>
    </div>
  )
}

export default CardDetails
