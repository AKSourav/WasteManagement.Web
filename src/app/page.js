import React from 'react';
import Link from 'next/link';
import separatorImage from '@/web_image/seperater-blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/page.css'
import Image from 'next/image';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <div className="container-fluid contain">
        <div className="shadow-img">
          <div className="contain-bodys">
            <h5 className="contain-titles">Environmental Awareness</h5>
            <p className="contain-texts">Educational initiatives to raise awareness about the importance of waste management.</p>
            <Link href="/about" className="btn btn-primary">Go somewhere</Link>
          </div>
        </div>
      </div>

      <div className="container welcome mt-4">
        <h2>Welcome to</h2>
        <div className="separatorImage"><Image src={separatorImage} alt="hamburger" /></div>
        {<p>If you&apos; re looking for a reliable partner to help you grow your business, look no further than Waste
          right solution, please find our services.</p>}
      </div>
      <div className="container section-intro">
        <h2>Recycling Programs</h2>
        <div className="separatorImage"><Image src={separatorImage} alt="hamburger" /></div>

        <p>Join our recycling programs to reduce waste and promote sustainability.</p>
        <hr />
      </div>



      <div className="container program-features">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="p-2 card">
              <div className="card-body">
                <h3>Environmental Impact</h3>
                <p>Contribute to the reduction of waste in landfills and minimize the environmental footprint.</p>
              </div>
            </div></div>
          <div className="col-md-6 mb-4">
            <div className="p-2 card">
              <div className="card-body">
                <h3>Community Engagement</h3>
                <p>Connect with a community dedicated to making a positive impact on the environment.</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="p-2 card">
              <div className="card-body">
                <h3>Comprehensive Recycling Solutions</h3>
                <p>We accept a variety of materials, ensuring responsible disposal of different types of waste.</p>
              </div>
            </div></div>
          <div className="col-md-6 mb-4">
            <div className="p-2 card">
              <div className="card-body">
                <h3>Comprehensive Recycling Solutions</h3>
                <p>We accept a variety of materials, ensuring responsible disposal of different types of waste.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="container mb-5 get-involved">
        <h2>How to Get Involved</h2>
        <div className="separatorImage"><Image src={separatorImage} alt="hamburger" /></div>

        <p>Ready to make a positive change? Sign up for our recycling programs now.</p>
        <Link href={'/auth'}>
          <button className='mb-5'>Join Now</button>
        </Link>
      </div>

      <div className="container-fluid  testimonials mt-5 mb-5">
        <div className="public_review card">
          <div className="row">
            <div className="col-md-4">
              <h3>1M+</h3>
              <p>Members</p>
            </div>
            <div className="col-md-4">
              <h3>20</h3>
              <p>States</p>
            </div>
            <div className="col-md-4">
              <h3>5</h3>
              <p>Rating</p>
            </div>
          </div>
        </div>

        <div className="container testimonials-content">
          <div className="row">
            <div className="col-md-5">
              <h2>What Others Are Saying</h2>
              <div className="separatorImage"><Image src={separatorImage} alt="hamburger" /></div>

              <p>Discover real stories from individuals and businesses who have joined us in making a meaningful impact on the environment.</p>
            </div>
            <div className="col-md-7"></div>
          </div>
        </div>
      </div>



      <div className="container stay-connected mt-4">
        <h2>Stay Connected</h2>
        <div className="separatorImage"><Image src={separatorImage} alt="hamburger" /></div>

        <p>Connect with us on social media to stay updated on the latest news, events, and success stories related to our recycling programs.</p>
      </div>




      <div className="container Services mt-4">
        <h2>Waste Collection Services</h2>
        <div className="separatorImage"><Image src={separatorImage} alt="hamburger" /></div>

        {/* <p>Efficient and reliable waste collection services tailored to your needs.</p> */}
        {<p>Welcome to our Waste Collection Services, where efficiency and reliability meet your unique needs.Our tailored waste management solutions ensure a seamless and eco-friendly disposal process.Whether you&apos;re a household or a business, we prioritize efficiency in collecting various types of waste to contribute to a cleaner environment. Our dedicated team is committed to providing reliable services that align with your specific requirements. Experience the convenience of waste disposal without compromising on sustainability. Join us in creating a waste-free future where our efficient waste collection services make a positive impact on both your surroundings and the planet.</p>}
      </div>

      <section className="container-fluid mt-5 cta">
        <h2>Start Making a Difference Today</h2>
        <p>Explore our services and join us in creating a cleaner and greener world.</p>
        <a href='/dashboard' className='btn btn-success'>Get Started</a>
      </section>




      <Footer />



    </>
  );
};

export default Home;
