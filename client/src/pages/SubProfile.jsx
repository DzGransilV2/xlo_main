import React from 'react'
// import Profile from './Profile'
import ProfileCard from '../components/ProfileCard'
import { useParams } from 'react-router-dom'

const SubProfile = () => {
  const {id} = useParams();
  return (
    <div>
      <ProfileCard UID={id}/>
    </div>
  )
}

export default SubProfile
