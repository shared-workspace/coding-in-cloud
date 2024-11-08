<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  labelText: string
}>()
const dropingImages = ref(false)
const images = ref<File[]>([])
const isDuplicate = (file: File) => {
  return images.value.some(image => image.name === file.name)
}
const appendImages = (files?: FileList | null) => {
  if (files) {
    for (let i = 0; i < files.length; i++) {
      if (isDuplicate(files[i])) {
        continue
      }
      images.value.push(files[i])
    }
  }
}
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  dropingImages.value = false
  appendImages(e.dataTransfer?.files)
}
const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  dropingImages.value = true
}
const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  dropingImages.value = false
}
const createObjectURL = (file: File) => {
  return window.URL.createObjectURL(file)
}
const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  appendImages(target.files)
  target.value = ''
}
const inputText = ref('')
</script>
<template>
  <div class="">
    <input
      type="text"
      v-model="inputText"
      class="px-4 my-4"
      placeholder="image group name ..optional"
    />
  </div>
  <div
    class="bg-zinc-8 max-w-xl min-h-sm mx-auto rounded-3xl p-4 flex flex-col"
  >
    <div class="text-2xl mb-4">Create New {{ labelText }} Group</div>
    <div
      :class="[
        'flex-grow bg-blue-3 bg-op-20 rounded-3xl flex justify-center items-center text-2xl',
        dropingImages ? 'border border-dashed border-blue-500' : '',
      ]"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <input
        type="file"
        accept="image/*"
        multiple
        class="hidden"
        id="image-upload-group"
        @change="handleInputChange"
      />
      <div v-if="dropingImages" class="">Drop Images Here...</div>
      <div v-else class="flex justify-center items-center gap-3 flex-wrap">
        <div class="flex justify-center items-center gap-2">
          <svg
            width="59"
            height="45"
            viewBox="0 0 59 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.3332 13.747L1.58323 13.747L1.58323 43.4553L40.3332 43.4553L40.3332 13.747Z"
              class="ArIAXb"
            ></path>
            <path
              d="M40.3332 13.747L17.0832 13.747L17.0832 33.122L40.3332 33.122L40.3332 13.747Z"
              class="qOFLsb"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.614479 12.7783L6.74988 12.7783L6.74988 14.7158L2.55198 14.7158L2.55198 18.9137L0.614479 18.9137L0.614479 12.7783Z"
              fill="#BDC1C6"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M39.3644 42.4866L39.3644 38.2887L41.3019 38.2887L41.3019 44.4241L35.1665 44.4241L35.1665 42.4866L39.3644 42.4866Z"
              fill="#BDC1C6"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.614479 38.2887L2.55198 38.2887L2.55198 42.4866L6.74987 42.4866L6.74987 44.4241L0.614479 44.4241L0.614479 38.2887Z"
              fill="#BDC1C6"
            ></path>
            <path
              d="M19.6665 30.2531H58.4165L58.4165 0.544722H19.6665L19.6665 30.2531Z"
              fill="#AECBFA"
            ></path>
            <path
              d="M19.6665 21.8429L19.6665 30.2525L58.4168 30.2525L58.4168 19.7406L49.6667 12.4069C48.6234 11.5342 47.2931 11.0699 45.9272 11.1018C44.5614 11.1337 43.2547 11.6596 42.2542 12.5801L33.4166 20.7918L28.4166 17.2548C27.7332 16.7781 26.9013 16.5563 26.0684 16.6288C25.2354 16.7012 24.4554 17.0632 23.8666 17.6505L19.6665 21.8429Z"
              fill="#669DF6"
            ></path>
            <path
              d="M30.0056 12.9386C31.7315 12.9386 33.1306 11.5395 33.1306 9.8136C33.1306 8.08773 31.7315 6.68863 30.0056 6.68863C28.2798 6.68863 26.8807 8.08773 26.8807 9.8136C26.8807 11.5395 28.2798 12.9386 30.0056 12.9386Z"
              fill="#E8F0FE"
            ></path>
          </svg>
          <span>Drop Multiple Images</span>
        </div>
        <span class="text-xl mx-4"> or </span>
        <label
          for="image-upload-group"
          class="text-blue cursor-pointer border-b border-dashed border-blue-500"
        >
          upload
        </label>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap gap-4 mt-4">
    <div v-for="(image, index) in images" :key="index">
      <div class="relative w-32 h-32 rounded-3xl overflow-hidden">
        <img
          :src="createObjectURL(image)"
          alt="image"
          class="w-full h-full object-cover"
        />
      </div>
      <button
        class="bg-red w-10 h-10 text-xl rounded-full flex justify-center items-center line-height-none pb-1 translate-x-25 -translate-y-35 cursor-pointer"
        @click="images.splice(index, 1)"
      >
        x
      </button>
    </div>
  </div>
</template>
