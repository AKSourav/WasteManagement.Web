import Spinner from '@/utils/Spinner/Spinner';
import React, { useEffect, useRef, useState } from 'react';
import './DirectionMap.css'

const DirectionMap = ({className,actions,srcCoordinates,destCoordinates,InfoDescription,srcPinColor,destPinColor}) => {
 const mapRef = useRef(null);
 const destRef = useRef(null);
 const srcRef = useRef(null);
 const directionsManagerRef = useRef(null);
 const mapManagerRef = useRef(null);
 const [loading,setLoading] = useState(false);

 useEffect(() => {
   if (typeof window.Microsoft !== 'undefined' && window.Microsoft.Maps && window.Microsoft.Maps.Directions) {
     const mapInstance = new window.Microsoft.Maps.Map(mapRef.current, {
       credentials: process.env.NEXT_PUBLIC_BING_MAPS_API_KEY,
     });
     const directionsManagerInstance = new window.Microsoft.Maps.Directions.DirectionsManager(mapInstance);
     console.log("Map Instance:", mapInstance);
     console.log("Map directions ManagerInstance:", directionsManagerInstance);
     mapManagerRef.current=mapInstance;
     directionsManagerRef.current=directionsManagerInstance;
   }

   return () => {
     if (mapManagerRef.current) {
        mapManagerRef.current.dispose();
     }
     if(directionsManagerRef.current){
        directionsManagerRef.current.clearAll();
        directionsManagerRef.current.clearDisplay();
     }
   };
 }, []);

 const loadDirection= async ()=>{
    if (destRef.current) {
        mapManagerRef.current.entities.remove(destRef.current);
      }
    if (srcRef.current) {
        mapManagerRef.current.entities.remove(srcRef.current);
      }
    
    let srcLocationInstance;
    if(srcCoordinates)
    {
        srcLocationInstance= new window.Microsoft.Maps.Location(srcCoordinates.latitude, srcCoordinates.longitude);
        srcRef.current=new window.Microsoft.Maps.Pushpin(
            srcLocationInstance,
            { 
                draggable: false,
                color: srcPinColor || 'blue'
            }
        );
        mapManagerRef.current.entities.push(srcRef.current);
        mapManagerRef.current.setView({
            center: new window.Microsoft.Maps.Location(srcCoordinates.latitude, srcCoordinates.longitude),
            // zoom: 15
        });
    }

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
        mapManagerRef.current.entities.push(destRef.current);
        mapManagerRef.current.setView({
            center: new window.Microsoft.Maps.Location(destCoordinates.latitude, destCoordinates.longitude),
            // zoom: 15
        });
        window.Microsoft.Maps.Events.addHandler(destRef.current, 'click', function (e) {
            const infobox = new window.Microsoft.Maps.Infobox(e.target.getLocation(), {
                title: 'Collection Point Information',
                description: InfoDescription || "Hello",
                actions: actions
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
    
            mapManagerRef.current.entities.push(infobox);
        });
    }
    if(destLocationInstance && srcLocationInstance)
    {
        setLoading(true);
        directionsManagerRef.current.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
          var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ location: srcLocationInstance });
          var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ location: destLocationInstance });
          directionsManagerRef.current.addWaypoint(waypoint1);
          directionsManagerRef.current.addWaypoint(waypoint2);
          directionsManagerRef.current.setRenderOptions({
            itineraryContainer: '#directionsContainer', // Container to render the itinerary
            waypointPushpinOptions: {
                visible: false,
            },
            });
            Microsoft.Maps.Events.addHandler(directionsManagerRef.current, 'directionsUpdated', function () {
                console.log('Directions updated event fired!!!');
                setLoading(false);
            });
          await directionsManagerRef.current.calculateDirections();
    }


 }
 
 useEffect(()=>{
    if(mapManagerRef.current)
    {
        loadDirection();
    }

    return ()=>{
        if(directionsManagerRef.current)
        {
            directionsManagerRef.current.clearAll();
            directionsManagerRef.current.clearDisplay();
        }
    }

 },[mapManagerRef.current,directionsManagerRef.current,srcCoordinates,destCoordinates,InfoDescription])

 return (
    <>
        {loading && <div style={{zIndex:99999}} className='inset-0 fixed h-screen w-full bg-transparent'>
                <Spinner/>
            </div>}
        <div id="bingMap" ref={mapRef} className={`h-full ${className}`}></div>
    </>
 );
};

export default DirectionMap;
