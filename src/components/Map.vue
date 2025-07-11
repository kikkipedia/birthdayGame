<template>
    
    <div id="map"></div>
    <div class="map-style-overlay"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import itemBox from '../assets/Item_Box_1.png'; // Adjust the path as necessary
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";



const coords = ref ([
    { lat: 57.71879084565982, lng: 11.949825156750219, points: 5, name: 'Tomaten' },
])

  const bounds = L.latLngBounds(
  [57.710393157301304, 11.932342624708077],  // southwest corner
  [57.725522715594906, 11.976893505032336]   // northeast corner
);

onMounted(() => {
  const map = L.map('map', {
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
  }).setView([57.71775503989976, 11.951572858120244], 15);


  L.tileLayer(`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAP_TILE_KEY}`, {
    maxZoom: 20,
    //attribution: '© OpenStreetMap contributors'
  }).addTo(map);

//no zoom control
  map.zoomControl.remove();

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

<style>
#map {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: 0;
  padding: 0;
}

#map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

#map {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
}

.map-style-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 10;
  pointer-events: none;

  /* 🌈 Retro look using CSS */
  background: radial-gradient(circle at center, rgba(255, 140, 0, 0.1) 0%, rgba(255, 255, 255, 0) 70%),
              rgba(245, 215, 161, 0.08); /* soft warm overlay */

  mix-blend-mode: multiply; /* try 'multiply' or 'overlay' too */
  filter: sepia(0.3) contrast(1.1) saturate(1.2);
}


</style>