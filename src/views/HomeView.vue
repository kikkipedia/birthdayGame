
<template>
  <main>
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
    
      <v-card
        class="mx-auto seventies-card"
        max-width="600"
      >
      <h3>Regler:</h3>
      Förrutom att sporta runt så kan du också samla poäng genom sportdryck. Tryck på ikonen när du dricker öl, vin eller shot. 
    <v-list density="compact" class="seventies-list-item">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        :active="true"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
  <v-btn
    class="seventies-button"
    block
    size="large"
    color="#ff8c00"
    @click="router.push('/game')"
  >
  KÖR!
  </v-btn>
  </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const userName = ref<string>('')
const nameConfirmed = ref<boolean>(false)
const items = ref([
  { text: 'Öl 5p', icon: 'mdi-beer' },
  { text: 'Vin 5p', icon: 'mdi-glass-wine' },
  { text: 'Shot 15p', icon: 'mdi-cup' },
  // { text: 'Gösta tycker om att simma', icon: 'mdi-swim' },
  // { text: 'Gösta är bra på matte', icon: 'mdi-numeric-1-box-multiple-outline' }
])

const router = useRouter()

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

<style scoped>

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

