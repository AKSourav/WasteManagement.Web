"use client"
import React, { useEffect, useLayoutEffect } from 'react';
import { GetClusterMap } from './Map';
import './BingMap.css'

const BingMap = ({ apiKey }) => {
  useLayoutEffect(() => {
    // Load Bing Maps API
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=${apiKey}&modules=directions&callback=loadBingMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Initialize the map in the loadBingMap callback
    window.loadBingMap = () => {
      var testDataIndia = [
        {
          latitude: 19.0760,
          longitude: 72.8777,
          address: '1 Gateway of India Rd',
          pincode: 400001,
          state: 'Maharashtra',
          country: 'India',
          city: 'Mumbai',
          material: 'Wood',
          quantity: 50,
          materialType: 'Teak',
          pinColor: 'green', // Custom pin color
        },
        {
          latitude: 28.6139,
          longitude: 77.2090,
          address: '2 India Gate',
          pincode: 110001,
          state: 'Delhi',
          country: 'India',
          city: 'New Delhi',
          material: 'Metal',
          quantity: 30,
          materialType: 'Iron',
          pinColor: 'red', // Custom pin color
        },
        {
          latitude: 12.9716,
          longitude: 77.5946,
          address: '3 MG Road',
          pincode: 560001,
          state: 'Karnataka',
          country: 'India',
          city: 'Bangalore',
          material: 'Plastic',
          quantity: 20,
          materialType: 'Polypropylene',
          pinColor: 'blue', // Custom pin color
        },
        // Add more data objects as needed
      ];
      var div_id="bingMap" 
      GetClusterMap(apiKey,testDataIndia,div_id);
    };

    return () => {
      // Cleanup script and global callback
      document.head.removeChild(script);
      delete window.loadBingMap;
    };
  }, [apiKey]);

  return<>
    <div id="bingMap" style={{ height: '90vh',zIndex:'0',overflow:'hidden' }}></div>
    {/* <div id="directionsContainer"></div> */}
  </> 
};



export default BingMap;
