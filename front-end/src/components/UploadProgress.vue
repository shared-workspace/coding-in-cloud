<script lang="ts" setup>
import { ref } from 'vue';

const imagesUploadCount = ref(0)
const imagesTotalCount = ref(5)
const simulateUpload = async () => {
  imagesUploadCount.value = 0
  while (imagesUploadCount.value < imagesTotalCount.value) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    imagesUploadCount.value++
  }
}
</script>
<template>
  <div class="w-screen h-screen absolute top-0 left-0 z-100 bg-black bg-op-80">
    <div class="w-96 h-96 bg-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="w-full h-12 bg-gray-200 flex items-center justify-center rounded-t-lg">
        <h1 class="text-lg font-bold">Uploading...</h1>
      </div>
      <div class="w-full h-64 bg-gray-100 flex items-center justify-center">
        <div class="w-64 h-64 flex flex-col items-center justify-center">
          <div :class="['w-40 h-40 bg-gray-300 rounded-full flex flex-col items-center justify-center'
            , imagesUploadCount === imagesTotalCount ? 'bg-green-500' : 'bg-red-500'
          ]">
            <h1 class="text-lg font-bold text-center mt-5"> Image Upload Progress</h1>
            <h1 class="text-lg font-bold">{{ imagesUploadCount }} / {{ imagesTotalCount }}</h1>
          </div>
          <button @click="simulateUpload" class="w-24 h-12 bg-blue-500 text-white rounded-lg mt-4">Simulate</button>
        </div>
      </div>
    </div>
  </div>
</template>
