<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { watch } from 'vue'

const props = defineProps<{
  type: 'success' | 'error' | 'warning'
  title: string
  message: string
  show: boolean
  callback: () => void
}>()
const emits = defineEmits(['update:show'])
const close = () => emits('update:show', false)
watch(
  () => props.show,
  show => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  },
  { immediate: true },
)
</script>
<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-op-80 text-black z-500"
  >
    <div
      class="min-w-md min-h-xs bg-white rounded-3xl flex flex-col justify-center items-center"
    >
      <div class="text-3xl">
        <div v-if="type === 'warning'" class="text-yellow-500 border-b border-dashed border-yellow-500">Warning</div>
        <div v-else-if="type === 'success'" class="text-green">Success</div>
        <div v-else class="text-red-500">Error</div>
      </div>
      <br />
      <p
        class="px-4 py-5 rounded-2xl"
        :class="{
          'bg-green-100 text-green-500': type === 'success',
          'bg-red-100 text-red-500': type === 'error',
          'bg-yellow-100 text-yellow-500': type === 'warning',
        }"
      >
        <span>{{ props.message }}</span>
        <span
        :class="{
          'bg-green-100 text-green-700': type === 'success',
          'bg-red-100 text-red-700': type === 'error',
          'bg-yellow-100 text-yellow-700': type === 'warning',
        }"
        >{{ props.title }}</span>
      </p>
      <div v-if="type !== 'warning'" class="flex justify-end p-4">
        <button
          @click="close"
          class="px-4 py-2 bg-red-500 text-white rounded-xl cursor-pointer hover:bg-red-700"
        >
          Close
        </button>
      </div>
      <div v-else class="flex justify-between p-4 gap-4">
        <button
          @click="close"
          class="px-4 py-2 bg-red-500 text-white rounded-xl cursor-pointer hover:bg-red-700"
        >
          Decline
        </button>
        <button
          @click="props.callback"
          class="px-4 py-2 bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
