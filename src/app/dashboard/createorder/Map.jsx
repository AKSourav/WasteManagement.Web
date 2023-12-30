import React, { useEffect, useRef, useState } from 'react';

const MicrosoftMaps = ({ coordinates, setCoordinates }) => {
  const mapRef = useRef(null);
  const pinRef = useRef(null);
  const [map,setMap]=useState(null);

  const loadMap =async () => {
    
    if(coordinates)
    {
      map.setView({
          center: new window.Microsoft.Maps.Location(coordinates.lat, coordinates.lon),
          zoom: 16,
      });
    

        // Initialize the pin with the provided coordinates
       setPin(map, coordinates);

        // Handle map click event to update pin coordinates
        window.Microsoft.Maps.Events.addHandler(map, 'click', function (e) {
        console.log('map clicked');
        const newCoordinates = e.location;
        setPin(map, { lat: newCoordinates.latitude, lon: newCoordinates.longitude });
        });
    }
  };

  const setPin = (map, coordinates) => {
      // Remove existing pin
      if (pinRef.current) {
        map.entities.remove(pinRef.current);
      }
    
      // Create a new pin at the specified coordinates
      const pin = new window.Microsoft.Maps.Pushpin(
        new window.Microsoft.Maps.Location(coordinates.lat, coordinates.lon),
        { draggable: true }
      );
    
      // Add pin to the map
      map.entities.push(pin);
      pinRef.current = pin;
    
      // Update the coordinates using setCoordinates when the pin is dragged
      window.Microsoft.Maps.Events.addHandler(pin, 'dragend', function (e) {
        // Check if e.entity is defined before accessing its properties
        console.log('pin dragend',e.location);
        if (e.location) {
          const newCoordinates = e.location;
          setCoordinates({ lat: newCoordinates.latitude, lon: newCoordinates.longitude });
        }
      });
    };    
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=${process.env.NEXT_PUBLIC_BING_MAPS_API_KEY}&callback=loadMapScenario`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    window.loadMapScenario=()=>{
        const mapI = new window.Microsoft.Maps.Map(mapRef.current, { });
        setMap(mapI);
    };

    // Cleanup function to remove the Bing Maps script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(()=>{
    if(map)
    {
        loadMap();
    }
  },[map,coordinates,setCoordinates]);


  return <div ref={mapRef} style={{ height: '400px' }} />;
};

export default MicrosoftMaps;
