<template>
  <h1>Välkommen till Gösta!</h1>
<div v-if="!nameConfirmed" class="form-wrapper">
    <v-text-field
      label="Namn"
      v-model="userName"
      class="seventies-input"
      hide-details
      variant="outlined"
    />
    <v-btn
      @click="setName"
      class="seventies-button"
      block
      size="large"
      color="#ff8c00"
    >
      Sporta!
    </v-btn>
  </div>
  <div v-else>
    <h2>Hej {{ userName }}!</h2>
    <h3>Regler:</h3>
      <v-card
        class="mx-auto seventies-card"
        max-width="600"
      >
      Förrutom att sporta runt så kan du också samla poäng genom sportdryck. Tryck på ikonen när du dricker öl, vin eller shot. 
    <v-list density="compact" class="seventies-list-item">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

const userName = ref<string>('')
const nameConfirmed = ref<boolean>(false)
const items = ref([
  { text: 'Tryck på ikonen när du dricker öl', icon: 'mdi-beer' },
  { text: 'eller om du dricker vin', icon: 'mdi-glass-wine' },
  { text: 'Shot ger mest poäng', icon: 'mdi-cup' },
  // { text: 'Gösta tycker om att simma', icon: 'mdi-swim' },
  // { text: 'Gösta är bra på matte', icon: 'mdi-numeric-1-box-multiple-outline' }
])

onMounted(() => {
  const storedName = localStorage.getItem('userName')
  if (storedName) {
    userName.value = storedName
    nameConfirmed.value = true
  }
  else {
    //userName.value = ''
    nameConfirmed.value = false
  }
})

const setName = () => {
  localStorage.setItem('userName', userName.value)
  nameConfirmed.value = true
}
</script>

<style>
.form-wrapper {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #f5deb3, #ffcc70);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.seventies-input .v-field {
  border: 2px solid #a0522d; /* sienna */
  background-color: #fff8dc; /* cornsilk */
  border-radius: 12px;
  font-family: 'Courier', monospace;
  color: #5e3c2c;
}

.seventies-button {
  background-color: #ff8c00; /* dark orange */
  color: #fff;
  font-weight: bold;
  font-family: 'Arial Rounded MT Bold', sans-serif;
  border-radius: 16px;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.seventies-button:hover {
  background-color: #e67e22; /* slightly darker orange */
}

h1 {
  font-family: 'Shrikhand', cursive;
  color: #d2691e; /* chocolate */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
h2 {
  font-family: 'Shrikhand', cursive;
  color: #8b4513; /* saddle brown */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
h3 {
  font-family: 'Shrikhand', cursive;
  color: #cd853f; /* peru */
}

.seventies-card {
  background-color: #fff8dc !important; /* cornsilk */
  border: 2px solid #a0522d !important; /* sienna */
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.seventies-list-item {
  font-family: 'Courier', monospace;
  color: #5e3c2c; /* dark brown */
  padding: 0.5rem;
  border-bottom: 1px solid #dcdcdc; /* light gray */
}
.seventies-list-item .v-icon {
  color: #ff8c00;
  margin-right: 0.2rem;
}

</style>
