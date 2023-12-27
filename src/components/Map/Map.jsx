"use client"
const addedMarkers = [];
export function GetClusterMap(mapToken, data, div_id) {
    // Get user's current location (assuming the browser supports geolocation)
    navigator.geolocation.getCurrentPosition(function (position) {
        const userLocation = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);

        // Load the required Bing Maps modules
        Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function () {
            Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
                // Initialize the map with the user's location
                const map = new Microsoft.Maps.Map(`#${div_id}`, {
                    credentials: mapToken,
                    center: userLocation,
                    zoom: 10,
                    mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
                });

                // Check if there is data to display
                if (!data?.length) return;

                const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
                const pins = data.map(function (locationData) {
                    const coordinates = new Microsoft.Maps.Location(locationData.latitude, locationData.longitude);

                    const pinColor = locationData.pinColor || 'blue';

                    const pin = new Microsoft.Maps.Pushpin(coordinates, {
                        color: pinColor,
                    });

                    pin.metadata = {
                        materialType: locationData.materialType,
                        quantity: locationData.quantity,
                        address: locationData.address,
                    };

                    Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
                        const materialInfo = `
                            Name: ${e.target.metadata.name}<br>
                            Material Type: ${e.target.metadata.materialType}<br>
                            Quantity: ${e.target.metadata.quantity}<br>
                            Address: ${e.target.metadata.address}<br>
                            Phone:<a href="tel:${e.target.metadata.phone}" class="Blondie">${e.target.metadata.phone}</a>`;
                        const infobox = new Microsoft.Maps.Infobox(e.target.getLocation(), {
                            title: 'Material Information',
                            description: materialInfo,
                            actions: [
                                {
                                    label: 'Get Directions',
                                    eventHandler: function () {
                                        // Calculate and display directions
                                        calculateAndDisplayDirections(userLocation, e.target.getLocation(), directionsManager);
                                    },
                                },
                                {
                                    label: 'Cancel Directions',
                                    eventHandler: function () {
                                        //Cancel Calculate and display directions
                                        cancelDisplayDirections(directionsManager);
                                    },
                                },
                            ],
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

                    return pin;
                });

                const clusterLayer = new Microsoft.Maps.ClusterLayer(pins, {
                    gridSize: 80,
                    clusteredPinCallback: createCustomClusteredPin,
                });

                map.layers.insert(clusterLayer);

                Microsoft.Maps.Events.addHandler(clusterLayer, 'click', function (e) {
                    if (e.target instanceof Microsoft.Maps.ClusterPushpin) {
                        const pushPins = e.target.containedPushpins;
                        var description = pushPins
                            .slice(0, 3)
                            .map((pin) => {
                                return pin.metadata.materialType;
                            })
                            .join('<br>');

                        if (pushPins.length > 3) {
                            description = description.concat('<br>...');
                        }

                        const clusterInfobox = new Microsoft.Maps.Infobox(e.target.getLocation(), {
                            title: 'Cluster Information',
                            description: description,
                            visible: true,
                        });

                        map.entities.push(clusterInfobox);
                    }
                });

                Microsoft.Maps.Events.addHandler(map, 'dblclick', function (e) {
                    const location = e.location;

                    // Check if a marker already exists at the clicked location
                    const existingMarker = findMarkerAtLocation(location);

                    if (existingMarker) {
                        // If a marker exists, remove it
                        removeMarker(existingMarker);
                    } else {
                        // If no marker exists, add a new one
                        addMarker(location, map);
                    }
                });
            });
        });
    });
}

function createCustomClusteredPin(cluster) {
    var minRadius = 12;
    var outlineWidth = 7;
    var clusterSize = cluster.containedPushpins.length;

    // Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
    var radius = (Math.log(clusterSize) / Math.log(10)) * 5 + minRadius;

    // Default cluster color is red.
    var fillColor = 'rgba(255, 40, 40, 0.5)';

    if (clusterSize < 10) {
        // Make the cluster green if there are less than 10 pushpins in it.
        fillColor = 'rgba(20, 180, 20, 0.5)';
    } else if (clusterSize < 100) {
        // Make the cluster yellow if there are 10 to 99 pushpins in it.
        fillColor = 'rgba(255, 210, 40, 0.5)';
    }

    // Create an SVG string of two circles, one on top of the other, with the specified radius and color.
    var svg = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="',
        radius * 2,
        '" height="',
        radius * 2,
        '">',
        '<circle cx="',
        radius,
        '" cy="',
        radius,
        '" r="',
        radius,
        '" fill="',
        fillColor,
        '"/>',
        '<circle cx="',
        radius,
        '" cy="',
        radius,
        '" r="',
        radius - outlineWidth,
        '" fill="',
        fillColor,
        '"/>',
        '</svg>',
    ];

    // Customize the clustered pushpin using the generated SVG and anchor on its center.
    cluster.setOptions({
        icon: svg.join(''),
        anchor: new Microsoft.Maps.Point(radius, radius),
        textOffset: new Microsoft.Maps.Point(0, radius - 8), // Subtract 8 to compensate for the height of text.
    });
}

function calculateAndDisplayDirections(origin, destination, directionsManager) {

    // Set the origin and destination
    const waypoint1 = new Microsoft.Maps.Directions.Waypoint({ location: origin });
    const waypoint2 = new Microsoft.Maps.Directions.Waypoint({ location: destination });

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
        if (response && response.statusCode === Microsoft.Maps.Directions.RouteResponseCode.success) {
            // Display the directions on the map
            directionsManager.setDirections(response);
        } else {
            console.error('Error calculating directions:', response);
        }
    });
}
function cancelDisplayDirections(directionsManager) {
    // Clear all waypoints from the directions manager
    directionsManager.clearAll();

    // Set the rendering options (optional, based on your requirements)
    directionsManager.setRenderOptions({
        itineraryContainer: null, // Remove the container reference
        waypointPushpinOptions: {
            visible: false,
        },
    });

    // Clear the directions layer
    directionsManager.clearDisplay();
}

// Function to add a marker at a specific location
function addMarker(location, map) {
    const marker = new Microsoft.Maps.Pushpin(location, {
        title: 'Custom Marker',
        
        draggable: true,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8" fill="#008CBA"/><line x1="12" y1="12" x2="12" y2="2" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="12" x2="12" y2="22" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="22" y1="12" x2="2" y2="12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="7" x2="17" y2="17" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="17" x2="17" y2="7" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    });

    Microsoft.Maps.Events.addHandler(marker, 'dblclick', function () {
        // Remove the marker on double-click
        removeMarker(marker);
    });

    map.entities.push(marker);
    addedMarkers.push(marker);
}

// Function to remove a marker from the map and the addedMarkers array
function removeMarker(marker) {
    const index = addedMarkers.indexOf(marker);
    if (index !== -1) {
        addedMarkers.splice(index, 1);
        marker.setOptions({ visible: false });
    }
}

// Function to find a marker at a specific location
function findMarkerAtLocation(location) {
    for (const marker of addedMarkers) {
        if (marker.getLocation().latitude === location.latitude && marker.getLocation().longitude === location.longitude) {
            return marker;
        }
    }
    return null;
}