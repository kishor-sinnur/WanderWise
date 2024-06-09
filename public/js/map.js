let maptoken = mapToken;
mapboxgl.accessToken = maptoken;
console.log(maptoken);

let map1; // Define map1 outside of the if...else statement

if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL');
} else {
  map1 = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geo_metry.coordinates,
    zoom: 9
  });
}

console.log(map1);
console.log(listing.geo_metry.coordinates);

// Check if map1 is defined before trying to add the marker
if (map1) {
  map1.on('load', function () {
    console.log('Map loaded');
    console.log(listing.geo_metry.coordinates);
    const marker = new mapboxgl.Marker({ color: 'red'})
      .setLngLat(listing.geo_metry.coordinates)
      .setPopup(
        new mapboxgl.Popup ({offset:25}).setHTML(
            `<h4>${listing.title}</h4><p>Exact Location will be provided after bookig</p>`
         )
      )
      .addTo(map1);
    console.log(marker);
  });
}
