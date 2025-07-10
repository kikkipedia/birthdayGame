<template>
    <v-chip 
      v-for="(item, i) in pointSystem"
      :key="i"
      class="ma-2 seventies-chip"
      text-color="white"
    >
      <v-icon :icon="item.icon" class="mr-2"></v-icon>
      {{ item.text }}
    </v-chip>
    <div class="map-container">
        <Map/>
    </div>

</template>

<script setup lang="ts">
import Map from '../components/Map.vue'
import { onMounted, ref } from 'vue'

const pointSystem = ref([
  { text: 'Öl', icon: 'mdi-beer' },
  { text: 'Vin', icon: 'mdi-glass-wine' },
  { text: 'Shot', icon: 'mdi-cup' },
  // { text: 'Gösta tycker om att simma', icon: 'mdi-swim' },
  // { text: 'Gösta är bra på matte', icon: 'mdi-numeric-1-box-multiple-outline' }
])
</script>

<style scoped>
.seventies-chip {
    background-color: #fff8dc !important; /* cornsilk */
    border: 2px solid #a0522d !important; /* sienna */
    border-radius: 12px;
    padding: 0.5rem 1rem !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: left;
    font-family: 'Courier', monospace;
    color: #5e3c2c; /* dark brown */
    cursor: pointer;

}

.map-container {
    height: 500px; /* or any fixed height you want */
    width: 100%;
    position: relative;
    margin-top: 20px;
}
</style>