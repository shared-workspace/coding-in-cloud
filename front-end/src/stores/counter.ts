import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    // doubleCount: computed(() => this.count * 2)
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    setCount(value: number) {
      this.count = value
    }
  },
  persist: true
})

