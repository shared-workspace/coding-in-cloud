<script lang="ts" setup>
import { watch } from 'vue'
import { useLoading } from '../composables/useLoading'

const { isLoading, loadingMessage } = useLoading()
// on complte page load, hide the loading screen
watch(isLoading, value => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>
<template>
  <div
    v-if="isLoading"
    class="w-screen h-screen absolute top-0 left-0 bg-black bg-op-80 flex justify-center items-center"
  >
    <div class="text-center">
      <span>{{ loadingMessage }}</span>
      <span class="dot-animation">.</span>
      <span class="dot-animation">.</span>
      <span class="dot-animation">.</span>
    </div>
  </div>
</template>

<style scoped>
.dot-animation {
  animation: blink 1.4s infinite both;
}

.dot-animation:nth-child(2) {
  animation-delay: 0.2s;
}

.dot-animation:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%,
  20%,
  50%,
  80%,
  100% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
}
</style>
