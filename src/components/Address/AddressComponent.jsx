"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import MicrosoftMaps from './Map';
import {useDispatch,useSelector} from 'react-redux';
import { addAddress } from '@/utils/redux/features/addressSlice';
import {toast,Toaster} from 'react-hot-toast';

const AddressInput = ({data,handleSubmit}) => {
  const [countryRegion, setCountryRegion] = useState(data?.country || '');
  const [state, setState] = useState(data?.state ||'');
  const [district, setDistrict] = useState(data?.district || '');
  const [locality, setLocality] = useState(data?.locality || '');
  const [postalCode, setPostalCode] = useState(data?.pincode ||'');
  const [addressLine, setAddressLine] = useState(data?.address ||'');
  const [coordinates, setCoordinates] = useState(data?{lat:Number(data?.lattitude),lon:Number(data?.longitude)}: null);

  // const {loading} = useSelector((state)=>state.savedAddress);
  const[loading,setLoading]= useState(false);
  const dispatch =useDispatch();

  const handleClickSubmit=async ()=>{
    setLoading(true);
    const formData= new FormData();
    formData.append('country',countryRegion);
    formData.append('state',state);
    formData.append('district',district);
    formData.append('locality',locality);
    formData.append('pincode',postalCode);
    formData.append('address',addressLine);
    formData.append('lattitude',coordinates.lat);
    formData.append('longitude',coordinates.lon);
    if(data)
    {
      await handleSubmit(formData,data?.saved_address_id);
    }
    else
    {
      await handleSubmit(formData);
    }
    setLoading(false);
  }
  
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

  
  const handleSearch = async () => {
    const apiUrl = `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=${countryRegion}&adminDistrict=${state}&locality=${locality}&postalCode=${postalCode}&addressLine=${addressLine}&key=${process.env.NEXT_PUBLIC_BING_MAPS_API_KEY}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[0]);
      
      if (data.resourceSets && data.resourceSets.length > 0) {
        setCoordinates({
          lat: data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[0],
          lon: data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[1],
        });
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
        setDistrict(district);
        setState(state);
        setCountryRegion(country);
        console.log('State:', state);
        console.log('District:', district);
      }
    } catch (error) {
      console.error('Error fetching pin code data:', error);
    }
  };
  
// Example of using OpenStreetMap Nominatim API for reverse geocoding
const  getCountryStateDistrictFromCoordinates= async (lat, lon) =>{
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const address = data.address;
    const country = address.country;
    const state = address.state;
    const postalCode= address.postcode;
    const city = address.city || address.town || address.county; // Adjust as needed
    // const district= address
    console.log("address from geo:",data);
    setCountryRegion(country);
    setState(state);
    setLocality(city);
    // setDistrict(district);
    setPostalCode(postalCode);
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
  }
}

useLayoutEffect(() => {
  if(!coordinates)
  fetchUserLocation();
}, []);

useEffect(()=>{
  if(postalCode)
  handleStateDistrict();
},[postalCode])

useEffect(()=>{
  if(coordinates)
  getCountryStateDistrictFromCoordinates(coordinates.lat,coordinates.lon)
},[coordinates])

  return (
    <div className='p-3 dark:bg-slate-900'>
      <Toaster/>
      <MicrosoftMaps className={'w-full h-72'} coordinates={coordinates} setCoordinates={setCoordinates} />
      {/* lat:{coordinates?.lat} lon:{coordinates?.lon} */}
      Here:{loading?"aa":"nn"}
      <div className="p-6 dark:bg-slate-800 bg-slate-300 rounded text-dark">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-slate-300 text-slate-900">Fill Your Complete Address</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Country/Region<span className='text-red-700 font-extrabold'>*</span></label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-slate-900"
              placeholder="Enter Country/Region"
              value={countryRegion}
              onChange={(e) => {setCountryRegion(e.target.value);setCoordinates(null)}}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">State<span className='text-red-700 font-extrabold'>*</span></label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-slate-900"
              placeholder="Enter Admin District"
              value={state}
              readOnly={true}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">District<span className='text-red-700 font-extrabold'>*</span></label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-slate-900"
              placeholder="Enter District"
              value={district}
              readOnly={true}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">City/Locality<span className='text-red-700 font-extrabold'>*</span></label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-slate-900"
              placeholder="Enter Locality"
              value={locality}
              onChange={(e) => {setLocality(e.target.value),setCoordinates(null)}}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Postal Code<span className='text-red-700 font-extrabold'>*</span></label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-slate-900"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => {setCoordinates(null);setPostalCode(e.target.value)}}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400">Address Line</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-dark rounded bg-dark dark:text-slate-900"
            placeholder="Enter Address Line"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className='flex justify-between items-center'>
            <button
              className="px-4 py-2 bg-blue-500 dark:text-slate-900 rounded hover:bg-blue-600 font-semibold"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="px-4 py-2 bg-slate-300 dark:bg-slate-900 dark:text-slate-300 rounded hover:bg-slate-500 font-semibold "
              onClick={()=>fetchUserLocation()}
            >
              Use Current Location
            </button>
          </div>
          <button
            className={`px-4 py-2 bg-green-500 dark:text-slate-900 rounded hover:bg-green-600 font-semibold ${(!coordinates || loading) ? "opacity-50" : ""}`}
            disabled={!coordinates || loading}
            onClick={handleClickSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
