"use client"
import React, { useEffect, useState } from 'react';
import './page.css'; // Import your CSS file for styling
import separatorImage from '@/web_image/seperater-blue.png';
import Footer from '@/components/Footer';
import Image from 'next/image';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, e.g., sending the data to a server

        // For demonstration purposes, log the form data to the console
        console.log(formData);
    };


    useEffect(()=>{
        document.title="Contact";
      });

    return (

        <>

            <div style={{
                marginTop: '90px',
                padding: 0,
                fontFamily: 'Arial, sans-serif',
                background: 'url("https://media.istockphoto.com/id/537389722/photo/tropical-rainforest.jpg?s=2048x2048&w=is&k=20&c=nwhXE1q4WwzCVfmcWCh8A1yyxDpVAOHSdyCdl58OxTs=") no-repeat center center fixed',
                backgroundSize: 'cover',
                color: '#fff',
                textAlign: 'center',
                // height: '50vh',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',

            }}>

                <div style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '150px',
                }}>
                    <h2 style={{
                        fontSize: '3em',
                        marginBottom: '10px',
                    }}>Contact Us</h2>
                    
                </div>
            </div>


            <div className="container get-touch mt-4 ">
                <div className="row">
                    <h3>Get Touch With Us</h3>
                    <div className="separatorImage"><Image src={separatorImage} alt="seperator" /></div>

                    <p>Don’t hestiate to ask us something, Our customer support team always ready to help you,
                        they will support you 24/7.</p>
                </div>
            </div>


            <div className="container mt-4 mb-5">
                <div className="row">
                    <div className="col-md-5">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <h4>Address</h4>
                                <p>Dhanbad</p>
                            </li>
                            <li className="list-group-item"><h4>Email:</h4>
                                <p>dhanbad@gmail.com</p></li>
                            <li className="list-group-item"><h4>Phone:</h4>
                                <p>7481009993</p></li>
                            <li className="list-group-item">logo</li>
                        </ul>
                    </div>
                    <div className="col-md-7">
                        <div className="contact-container">
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject:</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

                    <Footer/>

        </>

    );
};

export default Contact;
