import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from '../Banner/Banner'

function Home() {
  return (
    <>
    <Helmet>
        <title>Aura Fitness | Home</title>
    </Helmet>
    <Banner></Banner>
    
    
    </>
  )
}

export default Home