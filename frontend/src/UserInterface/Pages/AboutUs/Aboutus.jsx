import React from 'react'
import AboutCrouselBanner from '../../Components/About/AboutCrouselBanner'
import Navbar from '../../Components/Navbar'
import AboutSection from '../../Components/AboutSection'
import MainCTABanner from '../../Components/About/MainCTABanner'
import FoodBanner from '../../Components/About/FoodBanner'
import BestoftheDayBanner from '../../Components/About/BestoftheDayBanner'
import TeamSection from '../../Components/About/TeamSection'
import Footer from '../../Components/Footer'

const Aboutus = () => {
  return (
    <>
    
   {/* Navbar */}
   <Navbar/>

   {/* AboutBanner */}
    <AboutCrouselBanner/>

   {/* AboutBannerSection  */}
    <AboutSection/>

   {/* Main CTA Banner  */}
    <MainCTABanner/>

    <br />
    <br />
    <br />

   {/* Food Banner Section   */}
    <FoodBanner/>

   {/* Best Of the Day Section */}
    <BestoftheDayBanner/>

   {/* Team Section  */}
    <TeamSection/>

   <Footer/> 

    </>
  )
}

export default Aboutus
