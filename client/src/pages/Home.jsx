import React from 'react'
import Card from '../components/Card'

const Home = () => {
  return (
    <section className='w-full flex gap-5 flex-wrap'>
      <span className='font-semibold text-2xl'>Fresh recommendations</span>
      <div className='flex gap-5 flex-wrap'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  )
}

export default Home
