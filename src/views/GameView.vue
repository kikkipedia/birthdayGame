<template>
    <v-chip 
      v-for="(item, i) in pointSystem"
      :key="i"
      class="ma-2 seventies-chip"
      text-color="white"
      @click="updatePoints(item.points)"
    >
      <v-icon :icon="item.icon" class="mr-2"></v-icon>
      {{ item.text }}
    </v-chip>
    <div class="map-container">
        <Map/>
    </div>

    <div class="score">
      <h3>Dina poäng: {{ totalPoints }}</h3>
      <!--poängställning as dropdown-->
      <v-btn class="seventies-button" @click="showScoreboard = !showScoreboard" color="#ff8c00">
        Poängställning
      </v-btn>
      <v-list v-if="showScoreboard" class="seventies-list">
        </v-list>
    </div>

</template>

<script setup lang="ts">
import { updateDrinkPoints } from '@/db'
import Map from '../components/Map.vue'
import { ref } from 'vue'

const showScoreboard = ref(false)

const totalPoints = ref(0)

const pointSystem = ref([
  { text: 'Öl', icon: 'mdi-beer', points: 5 },
  { text: 'Vin', icon: 'mdi-glass-wine', points: 10 },
  { text: 'Shot', icon: 'mdi-cup', points: 15 },

])

const updatePoints = async (points: number) => {
  let total = await updateDrinkPoints({ name: localStorage.getItem("userName") || "", points });
  totalPoints.value = total;
  console.log(`Total poäng: ${totalPoints.value}`);
}
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
    border: 4px solid #a0522d; /* sienna / retro brown */
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(94, 60, 44, 0.2);
}

.score {
  text-align: left;
  margin-top: 20px;
  padding-left: 4px;
}

.seventies-chip {
  border-radius: 12px;
  box-shadow: 3px 3px 0 #a0522d;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  cursor: pointer;
}

.seventies-chip:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #a0522d;
}
</style>