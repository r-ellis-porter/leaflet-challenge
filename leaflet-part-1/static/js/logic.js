// Store our API endpoint as url.
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Perform a GET request to the query URL.
d3.json(url).then(data=>{
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Create the map.

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, earthquakes]
  });
  
  // Create a legend in the bottom right corner for the colors.
  let legend = L.control({
    position: 'bottomright'
  });
  
  // Match the colors to text.
  legend.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'info legend');
    let entry = ['90+', '70-90', '50-70', '30-50', '10-30', '-10-10']
    let colors = ['#541743', '#a1083b', '#f56300', '#f99301', '#f7bc00', '#f9f900']
    let labels = [];
    let legendInfo = "<h3>Legend</h3>";
    div.innerHTML = legendInfo;
    entry.forEach(function(entry, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\">" + entry + "</li>");
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Add the legend to the map.
  legend.addTo(myMap);
  
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// Create the features.

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Time: ${new Date(feature.properties.time)}</p>
            <p>Magnitude: ${feature.properties.mag} </p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
  }

 // Define a function that we want to run once for each feature in the features array.
  // Give each feature a marker that describes the depth and magnitude of the earthquake. 
  function createMarkers(feature, layer) {
    markers = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
      color: depthColors(feature.geometry.coordinates[2]),
      fillColor: depthColors(feature.geometry.coordinates[2]),
      fillOpacity: 0.75,
      radius: feature.properties.mag * 30000
    });
    return markers;
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createMarkers
  });

  // Send our earthquakes layer to the createMap function.
  createMap(earthquakes);
}

// Create function to determine color based on depth.
function depthColors(depth) {
  if (depth > 90) {
    return '#541743'
  } else if (depth > 70) {
    return '#a1083b'
  } else if (depth > 50) {
    return '#f56300'
  } else if (depth > 30) {
    return '#f99301'
  } else if (depth > 10) {
    return '#f7bc00'
  } else {
    return '#f9f900'
  }
}
