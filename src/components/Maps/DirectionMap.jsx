import Spinner from '@/utils/Spinner/Spinner';
import React, { useEffect, useRef, useState } from 'react';

const DirectionMap = ({className,srcCoordinates,destCoordinates,InfoDescription,srcPinColor,destPinColor}) => {
 const mapRef = useRef(null);
 const destRef = useRef(null);
 const srcRef = useRef(null);
 const [directionsManager,setDirectionsManager] = useState();
 const [map,setMap] = useState();
 const [loading,setLoading] = useState(false);

 useEffect(() => {
   if (typeof window.Microsoft !== 'undefined' && window.Microsoft.Maps && window.Microsoft.Maps.Directions) {
     const mapInstance = new window.Microsoft.Maps.Map(mapRef.current, {
       credentials: process.env.NEXT_PUBLIC_BING_MAPS_API_KEY,
     });
     const directionsManagerInstance = new window.Microsoft.Maps.Directions.DirectionsManager(mapInstance);
     console.log("Map Instance:", mapInstance);
     console.log("Map directions ManagerInstance:", directionsManagerInstance);
     setMap(mapInstance);
     setDirectionsManager(directionsManagerInstance);
   }

   return () => {
     if (map) {
        map.dispose();
     }
     if(directionsManager){
        directionsManager.clearAll();
        directionsManager.clearDisplay();
     }
   };
 }, []);

 const loadDirection= async ()=>{
    if (destRef.current) {
        map.entities.remove(destRef.current);
      }
    if (srcRef.current) {
        map.entities.remove(srcRef.current);
      }
    
    const srcLocationInstance= new window.Microsoft.Maps.Location(srcCoordinates.latitude, srcCoordinates.longitude);
    srcRef.current=new window.Microsoft.Maps.Pushpin(
        srcLocationInstance,
        { 
            draggable: false,
            color: srcPinColor || 'blue'
        }
    );
    map.entities.push(srcRef.current);
    map.setView({
        center: new window.Microsoft.Maps.Location(srcCoordinates.latitude, srcCoordinates.longitude),
        // zoom: 15
    });

    let destLocationInstance
    if(destCoordinates)
    {
        destLocationInstance=new window.Microsoft.Maps.Location(destCoordinates.latitude, destCoordinates.longitude)
        destRef.current=new window.Microsoft.Maps.Pushpin(
            destLocationInstance,
            { 
                draggable: false,
                color: destPinColor || 'red'
            }
        );
        map.entities.push(destRef.current);
        map.setView({
            center: new window.Microsoft.Maps.Location(destCoordinates.latitude, destCoordinates.longitude),
            // zoom: 15
        });
        window.Microsoft.Maps.Events.addHandler(destRef.current, 'click', function (e) {
            const infobox = new window.Microsoft.Maps.Infobox(e.target.getLocation(), {
                title: 'Collection Point Information',
                description: InfoDescription || "Hello",
            });
    
            infobox.setOptions({
                borderColor: 'rgba(0, 0, 0, 0.5)',
                borderWidth: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                showCloseButton: true,
                maxHeight: 200, // Set a maximum height if needed
                minWidth: 300,  // Set a minimum width if needed
                // Add other styling options as needed
            });
    
            map.entities.push(infobox);
        });
    }
    if(destLocationInstance)
    {
        setLoading(true);
        directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
          var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ location: srcLocationInstance });
          var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ location: destLocationInstance });
          directionsManager.addWaypoint(waypoint1);
          directionsManager.addWaypoint(waypoint2);
          directionsManager.setRenderOptions({
            itineraryContainer: '#directionsContainer', // Container to render the itinerary
            waypointPushpinOptions: {
                visible: false,
            },
            });
            Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', function () {
                console.log('Directions updated event fired!!!');
                setLoading(false);
            });
          await directionsManager.calculateDirections();
    }


 }
 
 useEffect(()=>{
    if(map && srcCoordinates)
    {
        loadDirection();
    }

    return ()=>{
        if(directionsManager)
        {
            directionsManager.clearAll();
            directionsManager.clearDisplay();
        }
    }

 },[map,directionsManager,srcCoordinates,destCoordinates,InfoDescription])

 return (
    <>
        {loading && <div style={{zIndex:99999}} className='inset-0 fixed h-screen w-full bg-transparent'>
                <Spinner/>
            </div>}
        <div ref={mapRef} className={`h-full ${className}`}></div>
    </>
 );
};

export default DirectionMap;
