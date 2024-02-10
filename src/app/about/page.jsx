"use client"
import React, { useEffect } from 'react'
import Footer from  "@/components/Footer"

const About = () => {
  
  useEffect(()=>{
    document.title="About Us";
  });

  return (
    <div>

      <div className="container " style={{marginTop:'100px',}}>
        <h2>About Us - Waste Management</h2>
        <p>
          Welcome to our waste management platform! We are dedicated to providing sustainable solutions for waste disposal and recycling. Our mission is to promote environmental consciousness and contribute to a cleaner, greener planet.
        </p>
        {/* Add more information about your waste management initiatives */}
        <div className="row mt-5">
        <h2>Mission</h2>
      <p>
        Our mission is to create a sustainable and eco-friendly environment by implementing effective waste management solutions.
        We strive to reduce, reuse, and recycle waste to minimize its impact on the planet and promote a cleaner, healthier future.
      </p>
        </div>

        <div className="row mt-5">
        <h2>Vision</h2>
      <p>
        Our vision is to be a leading force in waste management, fostering a society that values environmental responsibility.
        We aim to educate and inspire individuals and communities to adopt sustainable practices, ensuring a greener and more
        sustainable world for generations to come.
      </p>
        </div>
      </div>

    <Footer/>
    </div>
  )
}

export default About
