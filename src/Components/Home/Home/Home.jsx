import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from '../Banner/Banner'
import FeatureSection from '../FeaturedSection/FeatureSection'
import AboutSection from '../AboutSection/AboutSection'
import FeaturedClasses from '../FeaturedClasses/FeaturedClasses'

function Home() {
  return (
    <>
    <Helmet>
        <title>Aura Fitness | Home</title>
    </Helmet>
    <Banner></Banner>
    <FeatureSection></FeatureSection>
    <AboutSection></AboutSection>
    <FeaturedClasses></FeaturedClasses>
    
    </>
  )
}

export default Home