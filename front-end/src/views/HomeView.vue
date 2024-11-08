<script setup lang="ts">
import { ref } from 'vue';
// import HelloWorld from '../components/HelloWorld.vue';

// const count = ref(0);
const msg = ref('Hello Vue 3 + Vite');

</script>

<template>
  <main>
    <div class="">
      {{ msg }}
    </div>
    <!-- <div class="">Are You in Right place ???? maybe not !</div> -->
     <!-- <HelloWorld msg="Hello Vue 3 + Vite" v-model:count="count" /> -->
     <!-- <HelloWorld
        v-model:msg="msg"
        v-bind:count="count"
      /> -->
  </main>
</template>

<style scoped>
div {
  font-size: 1.5rem;
  padding: 2rem;
  display: flex;
  place-content: center;
}
</style>
<!--
<script setup lang="ts">
import { computed } from 'vue';
import { useCounterStore } from '../stores/counter';

const store = useCounterStore();
const count = computed({
  get: () => store.count,
  set: (value) => store.setCount(value),
})
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center font-900 text-5xl">
    <div class="min-w-xl flex flex-col text-center">
      <div class="h-1/2 flex justify-center items-center">
        {{ count }}
      </div>
      <div class="h-1/2 flex justify-center items-center">
        <button @click="count--" class="px-4 py-2 bg-white rounded-2xl">-</button>
        <button @click="count++" class="px-4 py-2 bg-white rounded-2xl">+</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
 -->
