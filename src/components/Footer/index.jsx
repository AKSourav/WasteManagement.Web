import React from 'react'
import "./index.css"
import phone from '@/web_image/phone.png';
import location from '@/web_image/location.png';
import mail from '@/web_image/mail.png';
import Image from 'next/image';

const Footer = (user) => {

  return (
    <div>
      <footer>

        <div className="container footer-first">
          {/* Footer Start */}
          <div className="row">
            <div className="col-md-3">
              <h4>KNOW YOUR</h4>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTXvmLn7mps-xlaWIf8U-CIAd8AiQony73Mg&usqp=CAU" alt="Avatar Logo" style={{ width: '150px' }} className="rounded-pill" />
            </div>
            <div className="col-md-3">
              <h4>About US</h4>
              <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Feedback</li>
                <li>Screen Reader Access</li>
                <li>Sitemap</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>IMPORTANT LINKS</h4>
              <ul>
                <li>Ministry of Law</li>
                <li>Jharkhand</li>
                <li>SWC</li>
                <li>Other Websites</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>POLICIES</h4>
              <ul>
                <li>Website Policies</li>
                <li>Hyperlinking Policies</li>
                <li>Privacy Policies</li>
                <li>Copyright Policies</li>
                <li>Help</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container footer-middle">
          <div className="row">
            <div className="col-md-4 ">
              <div className="d-flex p-3 text-white" >
                <div className="p-1">
                    <Image  src={mail} alt="mail" style={{ width: '50px' }}  />
                </div>
                <div className="p-1" >
                  <h3>Email</h3>
                  <p>anurag@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="d-flex p-3 text-white">
                <div className="p-1"> 
                <Image  src={location} alt="location" style={{ width: '40px' }} className="rounded-pill" />

                </div>
                <div className="p-1" >
                  <h3>Address</h3>
                  <p>Near Big Bazar, Dhanbad</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="d-flex p-3 text-white">
                <div className="p-1"> 
                <Image  src={phone} alt="phone" style={{ width: '40px' }} />
                </div>
                <div className="p-1">
                  <h3>Call Us On</h3>
                  <p>Front Desk:7481009993</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom footer */}
        < div className="container-fluid footer-bottom pt-4 px-4" >
          <div className="rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">Copyright
                &copy; 2024 <a href="#">Waste Management</a>, All Right Reserved.
              </div>
              <div className="col-12 col-sm-6 text-center text-sm-end">
                Designed By <a href="https://github.com/AnupMandal0505">Anurag Kumar </a> <span>&</span> <a href="https://github.com/AKSourav">Anupam Kumar Sourav</a>
                {/* <br />Distributed By: <a href="" target="_blank">Anupam</a> */}
              </div>
            </div>
          </div>
        </div >
      </footer >

    </div>
  )
}

export default Footer
