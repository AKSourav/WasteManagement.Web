import React, { useEffect, useRef, useState } from 'react';

const DirectionMap = ({className,srcCoordinates,destCoordinates,InfoDescription,srcPinColor,destPinColor}) => {
 const mapRef = useRef(null);
 const destRef = useRef(null);
 const srcRef = useRef(null);
 const [srcLocation,setSrcLocation] = useState();
 const [destLocation,setDestLocation] = useState();
 const [directionsManager,setDirectionsManager] = useState();
 const [map,setMap] = useState();

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

 const loadPins= async ()=>{
    if (destRef.current) {
        map.entities.remove(destRef.current);
      }
    if (srcRef.current) {
        map.entities.remove(srcRef.current);
      }
    
    const srcLocationInstance= new window.Microsoft.Maps.Location(srcCoordinates.latitude, srcCoordinates.longitude);
    setSrcLocation(srcLocationInstance);
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

    if(destCoordinates)
    {
        const destLocationInstance=new window.Microsoft.Maps.Location(destCoordinates.latitude, destCoordinates.longitude)
        setDestLocation(destLocationInstance);
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


 }
 const loadDirection = async () => {
    console.log("loadDirection", directionsManager, srcLocation, destLocation);
  
    if (typeof Microsoft === 'undefined' || !Microsoft.Maps || !Microsoft.Maps.Directions) {
      console.error("Bing Maps Directions module not loaded.");
      return;
    }
  
    if (!directionsManager) {
      console.error("DirectionsManager not initialized.");
      return;
    }
  
    if (!srcLocation || !destLocation) {
      console.error("Source or destination locations are not defined.");
      return;
    }
  
    try {
      // Set Route Mode to driving
      directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
      var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ location: srcLocation });
      var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ location: destLocation });
      directionsManager.addWaypoint(waypoint1);
      directionsManager.addWaypoint(waypoint2);
      directionsManager.setRenderOptions({
        itineraryContainer: '#directionsContainer', // Container to render the itinerary
        waypointPushpinOptions: {
            visible: false,
        },
        });
      // Set the element in which the itinerary will be rendered
      // directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
      await directionsManager.calculateDirections();
      console.log(InfoDescription);
    } catch (error) {
      console.error(error);
    }
  };
  

  function calculateAndDisplayDirections(origin, destination, directionsManager) {

    console.log("calculateAndDisplayDirections",origin,destination,directionsManager)
    // Set the origin and destination
    const waypoint1 = new window.Microsoft.Maps.Directions.Waypoint({ location: origin });
    const waypoint2 = new window.Microsoft.Maps.Directions.Waypoint({ location: destination });

    directionsManager.addWaypoint(waypoint1);
    directionsManager.addWaypoint(waypoint2);

    // Set the rendering options
    directionsManager.setRenderOptions({
        itineraryContainer: '#directionsContainer', // Container to render the itinerary
        waypointPushpinOptions: {
            visible: false,
        },
    });

    // Set the request options
    const requestOptions = {
        routeMode: Microsoft.Maps.Directions.RouteMode.driving,
    };

    // Make the route request
    directionsManager.calculateDirections(requestOptions, function (response) {
        if (response && response.statusCode === window.Microsoft.Maps.Directions.RouteResponseCode.success) {
            // Display the directions on the map
            directionsManager.setDirections(response);
        } else {
            console.error('Error calculating directions:', response);
        }
    });
}

 
 useEffect(()=>{
    if(map && srcCoordinates)
    {
        loadPins();
    }
    console.log("useEffect", directionsManager, srcLocation, destLocation);
    if(map && srcCoordinates && destCoordinates &&  directionsManager)
    {
        console.log("Hello!")
        loadDirection();
        // calculateAndDisplayDirections(srcLocation,destCoordinates,directionsManager)
    }

    return ()=>{
        if(directionsManager)
        {
            directionsManager.clearAll();
            directionsManager.clearDisplay();
            setSrcLocation();
            setDestLocation();
        }
    }

 },[map,directionsManager,srcCoordinates,destCoordinates,InfoDescription])

 return (
   <div ref={mapRef} className={`h-full ${className}`}></div>
 );
};

export default DirectionMap;
