<template>
    
    <div id="map"></div>
    <div class="map-style-overlay"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import itemBox from '../assets/boxActive.png'; 
import inactiveBox from '../assets/inActive.png'; 
import { getUser, updateUserPoints } from '@/db'

//stores completed stops ids
const completedStops = ref<number[]>([])
const markerMap = new Map<number, L.Marker>();

const coords = ref ([
    { id: 1, lat: 57.71879084565982, lng: 11.949825156750219, points: 30, text: 'Välkommen till Göstaspelen, om du är klädd enligt klädkod (sportlagströja) får du ett försprång på ' },
    { id: 2, lat: 57.71783363289993, lng: 11.951663249102943, points: 10, text: 'Bär en sportdryck som en fackla över bron' },
    { id: 3, lat: 57.71740330446308, lng: 11.956686853572373, points: 15, text: 'Hitta på en uppvärmningsövning och få två personer att vara med ' },
    { id: 4, lat: 57.717263732973215, lng: 11.956079126693734, points: 20, text: 'Mima att du sjunger nationalsången innan ett lopp - filma och skicka till Gösta' },
    { id: 5, lat: 57.71668488273099, lng: 11.956543327695838, points: 30, text: 'Etapp 1 i Göstaspelen: Simning! Simma två längder i havsvattenbassängen med valfri simstil – crawl, bröstsim eller varför inte "kallsup och sparkflax"' },
    { id: 6, lat: 57.7164846577691, lng: 11.956401707291576, points: 10, text: 'Hoppa från 3an' },
    { id: 7, lat: 57.72234567890123, lng: 11.957890123456789, points: 15, text: 'Gör bomben - filma och skicka till Gösta' },
    { id: 8, lat: 57.717944049908205, lng: 11.955618629761169, points: 30, text: 'Etapp 2: Cykling! Nu är det dags att spänna vaderna och cykla till Myntgatan 9, se till att inte missa uppdragen på vägen för extrapoäng!' },
    { id: 9, lat: 57.71501990961798, lng: 11.950089539149097, points: 15, text: 'Ta en bild där du ser jättefokuserad ut på cykeln, skicka till Gösta' },
    { id: 10, lat: 57.712169736205205, lng: 11.948713307772458, points: 20, text: 'Filma en motspelare och var kommentator - skicka till Gösta' },
    { id: 11, lat: 57.71592053479544, lng: 11.944878581903014, points: 30, text: 'Etapp 3: Löpning! Snyggt jobbat, nu är det bara sista etappen kvar. Ta dig till torget genom att springa på valfritt sätt, det räcker att det ser ut som att du springer. Passa på att utföra uppdrag för extra poäng.'},
    // TODO löpetappen med punkter
    { id: 12, lat: 57.719370642041525, lng: 11.94778020667397, points: 20, text: 'MÅÅÅÅL!! Grattis, du har tagit dig igenom Göstaspelen 2025 med bravur, unna dig 20 poäng om du har genomfört alla etapper. Det finns fortfarande möjlighet att ta fler poäng fram till priscermonin som äger rum på Tullen klockan 20:00!'},
    { id: 13, lat: 57.719119295374576, lng: 11.947655419103349, points: 15, text: 'Ta en selfie där du ser svettig och nöjd ut, skicka till Gösta' },
    { id: 14, lat: 57.71906618655746, lng: 11.948159729864917, points: 15, text: 'Filma en målgest och skicka till Gösta' },
    { id: 15, lat: 57.7193569641506, lng: 11.947462632358066, points: 15, text: 'Ta en bild där du ser extremt oberörd ut efter att ha sprungit, skicka till Gösta' },
    { id: 16, lat: 57.71914205627235, lng: 11.947825890346696, points: 20, text: 'Gör en segerintervju som om du just vann Göstaspelen - filma och skicka till Gösta' },
])

//TODO add random coords, perhaps in db?

  const bounds = L.latLngBounds(
  [57.710393157301304, 11.932342624708077],  // southwest corner
  [57.725522715594906, 11.976893505032336]   // northeast corner
);

onMounted(async () => {
    // get already completed stops
    const user = await getUser(localStorage.getItem('userName') || '');
    if (user != null) {
        completedStops.value = user.completedStops || [];
    }
  const map = L.map('map', {
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
  }).setView([57.71775503989976, 11.951572858120244], 15);


  L.tileLayer(`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAP_TILE_KEY}`, {
    maxZoom: 20,
    //attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  map.zoomControl.remove();

  const itemBoxIcon = L.icon({
  iconUrl: itemBox,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
})

coords.value.forEach((coord) => {
  const marker = L.marker([coord.lat, coord.lng], { icon: itemBoxIcon }).addTo(map);
  //if coords id is in completedStops, set marker to inactiveBox
    if (completedStops.value.includes(coord.id)) {
        marker.setIcon(L.icon({
        iconUrl: inactiveBox,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        }));
    }
    // Store marker by ID
    markerMap.set(coord.id, marker);
  const popupContent = `
    <div>
      <p>${coord.text} – <strong>${coord.points} p</strong></p>
      <button class="complete-btn" data-id="${coord.id}">
        ✅
      </button>
    </div>
  `;

  marker.bindPopup(popupContent);
});

map.on('popupopen', (e) => {
  const popupEl = e.popup.getElement();
  if (!popupEl) return;

  const button = popupEl.querySelector('.complete-btn') as HTMLButtonElement | null;
  const idStr = button?.getAttribute('data-id');
  if (!button || !idStr) return;

  const id = parseInt(idStr);

  const isDone = completedStops.value.includes(id);
  button.innerText = isDone ? '✅ Redan klar!' : '✅ Klart!';
  button.style.cursor = isDone ? 'default' : 'pointer';

  if (!isDone) {
    button.addEventListener('click', () => {
      handleExerciseComplete(id);

      // Update UI in popup after marking done
      button.innerText = 'Redan klar!';
      button.style.backgroundColor = '#ccc';
      button.style.cursor = 'default';
      button.disabled = true;
    }, { once: true });
  } else {
    button.disabled = true;
  }
});

async function handleExerciseComplete(id: number) {
  const stop = coords.value.find(c => c.id === id);
  if (!stop) return;

  if (completedStops.value.includes(id)) return;

  completedStops.value.push(id);

  await updateUserPoints({
    name: localStorage.getItem('userName') || '',
    points: stop.points,
    index: id,
  });

  // ✅ Update marker icon
  const marker = markerMap.get(id);
  if (marker) {
    marker.setIcon(L.icon({
      iconUrl: inactiveBox,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
    }));
  }

  alert(`Du har klarat: "${stop.text}" (${stop.points} p)!`);
}
})

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

.leaflet-popup {
  max-width: 270px;
  
}

.leaflet-popup-content-wrapper {
    border: 3px solid #a0522d !important; /* sienna */
    border-radius: 16px !important;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
}

</style>