"use client"
import React, { useState, useLayoutEffect } from 'react';

const MapLoader = ({ children, Spinner }) => {
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState('idle'); // New state for permission status

  useLayoutEffect(() => {
    // Request for geolocation permission
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        setPermissionStatus('granted');
      } else if (result.state === 'prompt') {
        setPermissionStatus('prompt');
        navigator.geolocation.getCurrentPosition(
          () => setPermissionStatus('granted'),
          () => setPermissionStatus('denied')
        );
      } else if (result.state === 'denied') {
        setPermissionStatus('denied');
      }
    });

    // Load Bing Maps API
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=${process.env.NEXT_PUBLIC_BING_MAPS_API_KEY}&modules=directions&callback=loadBingMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Initialize the map in the loadBingMap callback
    window.loadBingMap = () => {
      Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
      setLoading(false);
      })
    };

    return () => {
      // Cleanup script and global callback
      document.head.removeChild(script);
      delete window.loadBingMap;
    };
  }, []);

  return (
    <>
      {loading ? (
        <>
            {Spinner?<Spinner />:<div>Loading Map Scripts</div>}
        </>
      ) : permissionStatus === 'denied' ? (
        <div className="text-red-500">Geolocation permission was denied.</div>
      ) : permissionStatus === 'granted' ? (
        children
      ) : (
        <div className="text-gray-500">Requesting geolocation permission...</div>
      )}
    </>
  );
};

export default MapLoader;
