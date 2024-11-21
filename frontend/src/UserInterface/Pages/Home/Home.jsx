import React from 'react'
import Navbar from '../../Components/Navbar'
import CrouselBanner from '../../Components/CrouselBanner'
// import AboutSection from '../Components/AboutSection'
import PizzaSection from '../../Components/PizzaSection'
import MidBanner from '../../Components/MidBanner'
import MenuSection from '../../Components/MenuSection'
import FoodBanner from '../../Components/FoodBanner'
import CTABanner from '../../Components/CTABanner'
import Footer from '../../Components/Footer'

const Home = () => {
  return (
    <>
    {/* Navbar section */}
     <Navbar/>

    {/* CrouselBanner  */}
     <CrouselBanner/>


    {/* PizzaSection  */}
     <PizzaSection/>

    {/* MidBanner  */}
     <MidBanner/>

    {/* AboutSection  */}
     {/* <AboutSection/> */}

    {/* Menu Section  */}
     <MenuSection/>

    {/* FoodBanner  */}
     <FoodBanner/>
    
    {/* CTA Banner  */}
     <CTABanner/>

    {/* Footer  */}
     <Footer/>
    
    
    
    </>
    
  )
}

export default Home
