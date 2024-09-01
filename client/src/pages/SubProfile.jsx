import React from 'react'
// import Profile from './Profile'
import ProfileCard2 from '../components/ProfileCard2'
import { useParams } from 'react-router-dom'

const SubProfile = () => {
  const {id} = useParams();
  return (
    <div>
      <ProfileCard2 UID={id}/>
    </div>
  )
}

export default SubProfile
