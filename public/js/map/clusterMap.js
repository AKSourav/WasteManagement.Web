// // alert("aaa");
function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('map'), {
        credentials: 'AmogcyCWWujxX-A2zPfaERWoVMpxLB-BCV9G5MqXlyJmeeaqRG4MBrFJnavK0Gnl', // Replace with your API key
        center: new Microsoft.Maps.Location(47.6062, -122.3321), // Replace with your desired coordinates
        zoom: 8
    });

    var pinInfoBox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
    map.entities.push(pinInfoBox);

    var pins = [
        { location: new Microsoft.Maps.Location(47.6062, -122.3321), title: 'Point 1', description: 'Details for Point 1' },
        { location: new Microsoft.Maps.Location(47.7062, -122.4321), title: 'Point 2', description: 'Details for Point 2' },
        // Add more points as needed
    ];

    var pinLayer = new Microsoft.Maps.ClusterLayer(pins, {
        clusteredPinCallback: createCustomClusteredPin,
        clusteredPinOptions: {
            color: 'rgba(0, 128, 255, 0.8)',
            textOffset: new Microsoft.Maps.Point(0, 5)
        }
    });

    map.layers.insert(pinLayer);

    function createCustomClusteredPin(cluster) {
        var loc = cluster.getLocation();
        var count = cluster.getClusterSize();

        var pushpin = new Microsoft.Maps.Pushpin(loc, {
            title: count.toString(),
            subTitle: 'Click for details',
            text: count.toString(),
            color: 'red',
            textOffset: new Microsoft.Maps.Point(0, 10),
            anchor: new Microsoft.Maps.Point(12, 39),
        });

        Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
            showDetails(cluster);
        });

        return pushpin;
    }

    function showDetails(cluster) {
        var loc = cluster.getLocation();
        var count = cluster.getClusterSize();

        // Display details in an infobox
        pinInfoBox.setOptions({
            location: loc,
            title: 'Cluster Details',
            description: 'This cluster contains ' + count + ' points.',
            visible: true
        });
    }
}

// Callback function
function loadMap() {
    // This function will be called once the Bing Maps API is loaded
    var map = new Microsoft.Maps.Map(document.getElementById('map'), {
      credentials: 'AmogcyCWWujxX-A2zPfaERWoVMpxLB-BCV9G5MqXlyJmeeaqRG4MBrFJnavK0Gnl',
      center: new Microsoft.Maps.Location(47.6062, -122.3321),
      zoom: 8
    });
  
    // Now, you can use Microsoft.Maps.ClusterLayer
    Microsoft.Maps.loadModule('Microsoft.Maps.ClusterLayer', function () {
      var pins = [
        // Your pin data here
      ];
  
      var clusterLayer = new Microsoft.Maps.ClusterLayer(pins);
      map.layers.insert(clusterLayer);
    });
  }
  