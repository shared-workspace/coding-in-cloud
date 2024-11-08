<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = defineProps<{
  msg: string,
  count: number,
}>()
const emits = defineEmits<{
  'update:count': [value: number],
  'update:msg': [value: string],
}>()
const localCount = computed({
  get: () => props.count,
  set: (value: number) => emits('update:count', value),
})
onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <div class="greetings">
    <!-- <input type="text" v-model="msg" /> -->
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
    <button @click="localCount++">count is: {{ localCount }}</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
