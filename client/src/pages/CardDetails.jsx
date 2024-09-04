import React, { useEffect, useState, useRef } from 'react';
import { ReactComponent as ArrowDownIcon } from '../assets/svg/ArrowDownSVG.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/svg/ArrowUpSVG.svg';
import Card from '../components/Card';

import '../styles/leaflet.css';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import axios from 'axios';
import { hostname } from '../config';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import Canvas from '../components/Canvas';
import Toggle from '../components/Toggle'


const CardDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMainImg, setNewMainImg] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lon: -0.09 }); // Default coordinates
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = React.useState(false);

  const { id } = useParams();
  const canvasRef = useRef(null);

  const customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=13800&format=png&color=000000',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });


  // const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
  const token = JSON.parse(localStorage.getItem('token'));
  // console.log(token);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${hostname}/posts/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  useEffect(() => {
    if (post && post.propics && post.propics.length > 0) {
      setNewMainImg(post.propics[0]);
      setLocation(post.location.city);
    }
  }, [post]);

  useEffect(() => {
    const handleSearch = async () => {
      if (location) {
        const result = await fetchCoordinates(location);
        if (result) {
          setCoordinates(result);
        } else {
          alert("Location not found.");
        }
      }
    };

    handleSearch();
  }, [location]);

  const fetchCoordinates = async (locationName) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      return null;
    }
  };

  // Custom component to update map view when coordinates change
  const MapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, [center, map]);
    return null;
  };

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

  const storeURL = (pic) => {
    setNewMainImg(pic);
  };

  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-auto'>
      {post && (
        <>
          <div className='flex gap-5'>
            <div className='relative w-[829px] h-[490px] flex items-center justify-center overflow-hidden bg-myGrey rounded-myRound'>
              {post.splatFileURL && <Toggle isChecked={isChecked} setIsChecked={setIsChecked} />}
              {!isChecked ?
                <img className='h-full' src={newMainImg} alt="main-pic" />
                :
                <Canvas splat={post.splatFileURL} />
              }
            </div>
            <div className='w-[431px] h-[490px] rounded-myRound flex gap-5'>
              <div className='flex h-fit flex-wrap gap-5'>
                {post.propics.map((pic, index) => (
                  <div key={index} className='w-[150px] h-[150px] bg-myGrey rounded-myRound overflow-hidden'>
                    <img className='h-full w-full object-cover' onClick={() => storeURL(pic)} src={pic} alt={`sub-pic-${index}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex gap-5'>
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
              <Link to={`/user/profile/${post.uid}`} className='w-[240px] h-10 rounded-myRound bg-white font-semibold text-base px-14 py-2'>Chat with Seller</Link>
            </div>
          </div>
          <div className='flex gap-5 text-xl'>
            <div className='px-5 py-[15px] w-[829px] break-words h-auto flex flex-wrap flex-col gap-5 bg-myGrey rounded-myRound'>
              <span className='font-semibold'>Description</span>
              <span className='font-normal'>
                {post.description}
              </span>
            </div>
            <div className='w-[431px] h-[306px] overflow-hidden bg-myGrey rounded-myRound'>
              <MapContainer
                center={[coordinates.lat, coordinates.lon]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <MapView center={[coordinates.lat, coordinates.lon]} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[coordinates.lat, coordinates.lon]} icon={customIcon}>
                  <Popup>
                    {location}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardDetails;
