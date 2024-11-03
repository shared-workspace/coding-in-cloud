<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue';

const errorFlag = ref(false)

defineExpose({
  showError: () => {
    errorFlag.value = true
  },
})

const props = defineProps({
  featureName: String,
  filterName: String,
  images: Array as PropType<File[]>,
})

const emits = defineEmits(['update:images'])

const localImages = computed({
  get: () => props.images ?? [],
  set: (value) => emits('update:images', value),
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const newFiles = Array.from(target.files);
    const existingFileNames = localImages.value.map(file => file.name);
    const filteredFiles = newFiles.filter(file => !existingFileNames.includes(file.name));
    localImages.value = [...localImages.value, ...filteredFiles];
  }
}

const createObjectURL = (file: File) => window.URL.createObjectURL(file);

</script>
<template>
  <label>
    Select Images in Group for feature:
    <span :class="[featureName ? 'text-blue' : 'text-red']">{{
      featureName || 'not provided'
    }}</span>
    and filter:
    <span :class="[filterName ? 'text-blue' : 'text-red']">{{
      filterName || 'not provided'
    }}</span>
  </label>
  <label for="multiple-image-select" class="min-w-50 min-h-50 bg-white rounded-2xl flex justify-center items-center">
    <span class="text-xl text-black">+</span>
  </label>
  <input type="file" multiple class="hidden" id="multiple-image-select" @change="handleFileChange" />
  <div
    :class="[
      'text-xs text-red px-3 my-4',
      errorFlag && localImages.length === 0 ? 'op-100' : 'op-0',
      ]"
  >
    At least need 1 image to be selected !
  </div>
  <div class="flex flex-wrap">
    <div
      v-for="image in localImages"
      :key="image.name"
      class="flex items-center justify-between border border-gray-300 rounded-2xl p-2 my-2"
    >
      <img :src="createObjectURL(image)" class="w-50 h-50 object-cover" />
      <button
        @click="localImages = localImages.filter((img) => img.name !== image.name)"
        class="cursor-pointer w-10 h-10 bg-red text-white rounded-full border-none -translate-y-24 -translate-x-5"
      >
        X
      </button>
    </div>
  </div>
</template>
<style scoped>
</style>
