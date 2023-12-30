"use client"
import React, { useEffect, useState } from 'react';
import MicrosoftMaps from './Map';

const AddressInput = () => {
  const [countryRegion, setCountryRegion] = useState('');
  const [state, setState] = useState('');
  const [locality, setLocality] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const fetchUserLocation=async ()=>{
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          };
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            setCoordinates({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            });
            console.log("navigator pos:", pos.coords.latitude);
            console.log("navigator pos:", pos.coords.longitude);
          },
          function (err) {
            console.log("navigator err:", err);
          },
          options
        );
      }
  }

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const handleSearch = async () => {
    // Implement your logic to call Bing Maps Locations API here
    // Use the entered data to construct the API URL and fetch results
    // Update the 'addresses' state with the fetched results
    const apiUrl = `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=${countryRegion}&adminDistrict=${state}&locality=${locality}&postalCode=${postalCode}&addressLine=${addressLine}&key=${process.env.NEXT_PUBLIC_BING_MAPS_API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[0]);

      if (data.resourceSets && data.resourceSets.length > 0) {
        setAddresses(data.resourceSets[0].resources);
        setCoordinates({
          lat: data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[0],
          lon: data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[1],
        });
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };
  const handleStateDistrict = async () => {
    // Fetch state and district information based on the entered pin code
    const pincodeUrl = `/api/pincode/${postalCode}`;

    try {
      const pincodeResponse = await fetch(pincodeUrl);
      const pincodeData = await pincodeResponse.json();

      if (pincodeData.PostOffice && pincodeData.PostOffice.length > 0) {
        const state = pincodeData.PostOffice[0].State;
        const district = pincodeData.PostOffice[0].District;
        const country = pincodeData.PostOffice[0].Country;


        // Use state and district information as needed
        setLocality(district);
        setState(state);
        setCountryRegion(country);
        console.log('State:', state);
        console.log('District:', district);
      }
        } catch (error) {
        console.error('Error fetching pin code data:', error);
        }
  };

  useEffect(()=>{
    if(postalCode)
    handleStateDistrict();
  },[postalCode])

  return (
    <div className="p-6 bg-dark text-dark">
      <MicrosoftMaps coordinates={coordinates} setCoordinates={setCoordinates} />
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Bing Maps Address Search</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Country/Region</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-white"
            placeholder="Enter Country/Region"
            value={countryRegion}
            onChange={(e) => setCountryRegion(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">State</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-white"
            placeholder="Enter Admin District"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Locality/City</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-white"
            placeholder="Enter Locality"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Postal Code</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-white"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-400">Address Line</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-white"
          placeholder="Enter Address Line"
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 dark:text-white rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className={`px-4 py-2 bg-green-500 dark:text-white rounded hover:bg-green-600 ${!coordinates ? "opacity-50" : ""}`}
          disabled={!coordinates}
        >
          Submit
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold dark:text-white">Search Results</h2>
        <ul className="mt-2">
          {
            <li className="dark:text-white">
              {coordinates?.lat}    {coordinates?.lon}
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default AddressInput;
