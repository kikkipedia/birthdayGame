import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('points', () => {
  const points = ref(0)
  const updatePoints = (value: number) => {
    points.value = value
  }
  const addPoints = (value: number) => {
    points.value += value
  }

  return { points, updatePoints, addPoints }
})
