<template>
    
    <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import itemBox from '../assets/Item_Box_1.png'; // Adjust the path as necessary
import "@maptiler/leaflet-maptilersdk";

const coords = ref ([
    { lat: 57.71879084565982, lng: 11.949825156750219, points: 5, name: 'Tomaten' },
])

onMounted(() => {
  const map = L.map('map').setView([57.71775503989976, 11.951572858120244], 15);

  //TODO add bounding box
  // const bounds = L.latLngBounds(
  //   [57.71775503989976, 11.951572858120244],
  //   [57.71879084565982, 11.949825156750219]
  // );
  // map.fitBounds(bounds);

  const styleId = '0197f435-45e9-72fe-8b4f-7fe12a6f99aa';

  L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAP_TILE_KEY}`, {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Create a MapTiler Layer inside Leaflet
// const mtLayer = new L.maptiler.maptilerLayer({
//   // Get your free API key at https://cloud.maptiler.com
//   apiKey: import.meta.env.VITE_MAP_TILE_KEY,
//   style: `https://api.maptiler.com/maps/0197f435-45e9-72fe-8b4f-7fe12a6f99aa/style.json?key=${import.meta.env.VITE_MAP_TILE_KEY}`,
// }).addTo(map);


//   const itemBoxIcon = L.icon({
//   iconUrl: itemBox,
//   iconSize: [48, 48],
//   iconAnchor: [24, 48],
// })

const itemBoxIcon = L.icon({
  iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#5e3c2c" flood-opacity="0.5" />
        </filter>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="6" ry="6"
            fill="#f5d7a1" stroke="#a0522d" stroke-width="3" filter="url(#shadow)"/>
      <text x="50%" y="55%" text-anchor="middle" font-size="20" fill="#5e3c2c"
            font-family="Arial Rounded MT Bold">?</text>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const startIcon = L.icon({
  iconUrl: `https://api.geoapify.com/v2/icon?type=awesome&icon=flag-checkered&color=%23f51e0f&size=64&contentSize=24&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,
  iconSize: [30, 46],
  iconAnchor: [15, 40],
  popupAnchor: [0, -42]
});

  L.marker([57.718358378336845, 11.947729345680587], { icon: startIcon }).addTo(map)
    .bindPopup('Start')
    //.openPopup();

    coords.value.forEach(coord => {
      L.marker([coord.lat, coord.lng], { icon: itemBoxIcon }).addTo(map)
        .bindPopup(`${coord.name} - ${coord.points} p`);
    });

  // Wait for DOM layout to finish before fixing tile layout
  setTimeout(() => {
    map.invalidateSize();
  }, 300);
});


</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: 0;
  padding: 0;
}


</style>