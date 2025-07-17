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
          <v-list-item v-for="(user, index) in scoreboard" :key="index">
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.points }}</v-list-item-subtitle>
          </v-list-item>
      </v-list>
    </div>

</template>

<script setup lang="ts">
import { updateDrinkPoints, getUser, getAllUsers } from '@/db'
import Map from '../components/Map.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useCounterStore } from '@/stores/counter'

interface PointSystemItem {
  text: string
  icon: string
  points: number
}

interface User {
  name: string
  points: number
}


const pointSystem = ref<PointSystemItem[]>([
  { text: 'Öl', icon: 'mdi-beer', points: 10 },
  { text: 'Vin', icon: 'mdi-glass-wine', points: 10 },
  { text: 'Shot', icon: 'mdi-cup', points: 15 },
])
const store = useCounterStore()

onMounted(async () => {
  //fetch from db
  const userName = localStorage.getItem("userName") || "";
  if (userName) {
    const total = await getUser(userName);
    store.updatePoints(total && total.points ? total.points : 0);
  }
});


const showScoreboard = ref<boolean>(false)
const scoreboard = ref<User[]>([])

const totalPoints = computed<number>(() => store.points)

const updatePoints = async (points: number): Promise<void> => {
  let total = await updateDrinkPoints({ name: localStorage.getItem("userName") || "", points });
  store.updatePoints(total);
  await loadScoreboard();
}

const loadScoreboard = async () => {
  const users = await getAllUsers();
  console.log("Loaded users:", users);

  if (!users || users.length === 0) {
    scoreboard.value = [];
    return;
  }

  scoreboard.value = users
    .map((user: any) => ({
      name: user.id || user.name || 'Okänd',
      points: user.points ?? 0
    }))
    .sort((a, b) => b.points - a.points);
};

// Load scoreboard when dropdown is shown
watch(showScoreboard, async (val) => {
  if (val) {
    await loadScoreboard();
  }
});
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