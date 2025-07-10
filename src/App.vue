<template>
  <h1>Göstas triatlon</h1>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

const userName = ref<string>('')
const nameConfirmed = ref<boolean>(false)
const items = ref([
  { text: 'Öl 5p', icon: 'mdi-beer' },
  { text: 'Vin 5p', icon: 'mdi-glass-wine' },
  { text: 'Shot 15p', icon: 'mdi-cup' },
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
  padding: 1rem !important; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: 'Courier', monospace;
  color: #5e3c2c; /* dark brown */
}
.v-list {
  background-color: #fff8dc !important; /* cornsilk */
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0px !important;
}
.seventies-list-item {
  padding: 0.5rem;
  border-bottom: 1px solid #dcdcdc; /* light gray */
  background-color: #fff8dc !important;
}
.seventies-list-item .v-icon {
  color: #ff8c00;
  margin-right: 0.2rem;
}
.v-list-item__prepend {
  margin-right: 0.5rem;
  flex-direction: column;

}
</style>
