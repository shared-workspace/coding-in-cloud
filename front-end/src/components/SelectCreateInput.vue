<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import PopupMessage from './PopupMessage.vue'

const props = defineProps<{
  labelText: string
  options: string[]
  selected: string
  create: (value: string) => Promise<{ success: boolean }>
  delete: (callback: () => void) => Promise<{ success: boolean }>
  exclude?: () => boolean
}>()

const disabled = ref(false)
const disableAll = () => {
  disabled.value = props.exclude ? props.exclude() : false
}
const emits = defineEmits(['update:selected'])
const localSelected = computed({
  get: () => props.selected,
  set: value => emits('update:selected', value),
})
const showSelect = ref(false)
const alreadyPresent = computed(() => props.options.includes(inputText.value))
const inputText = ref('')
const createNewOption = async () => {
  if (alreadyPresent.value) return
  if (inputText.value) {
    const res = await props.create(inputText.value)
    if (res.success) {
      emits('update:selected', inputText.value)
      inputText.value = ''
      showSelect.value = true
    }
  }
}
watch(
  () => props.options,
  options => {
    if (options.length) showSelect.value = true
  },
  { immediate: true },
)
const showConfirmPopup = ref(false)
const callbackDelete = () => {
  showConfirmPopup.value = false
  props.delete(() => (localSelected.value = ''))
}
const confirmDelete = () => {
  if (localSelected.value) {
    showConfirmPopup.value = true
  }
}
</script>
<template>
  <PopupMessage
    v-if="showConfirmPopup"
    type="warning"
    :title="selected"
    :message="'Are you sure you want to delete ' + labelText + ' '"
    :callback="callbackDelete"
    v-model:show="showConfirmPopup"
  />
  <div class="text-3xl mb-5">{{ labelText }}</div>
  <div v-if="showSelect" class="flex items-center justify-center">
    <select
      v-model="localSelected"
      class="w-1/2 p-2 border border-gray-300 rounded-md"
      :class="{ 'cursor-not-allowed': disabled }"
      :disabled="disabled"
    >
      <option value="" disabled>Select {{ labelText }}</option>
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <button
      @click="showSelect = !showSelect"
      class="ml-2 p-2 bg-blue-500 text-white rounded-md"
      :class="{ 'cursor-not-allowed bg-gray-400': disabled }"
      :disabled="disabled"
    >
      Create new
    </button>
    <span class="ms-2">or</span>
    <button
      @click="confirmDelete"
      :disabled="disabled || !localSelected"
      :class="[
        'ml-2 p-2 text-white rounded-md',
        !disabled || localSelected
          ? 'cursor-pointer bg-red-500'
          : 'bg-gray-400 cursor-not-allowed',
      ]"
    >
      Delete
    </button>
  </div>
  <div v-else class="flex items-center justify-center">
    <input
      v-model="inputText"
      class="w-1/2 p-2 border border-gray-300 rounded-md"
      :class="{ 'cursor-not-allowed': disabled }"
      :placeholder="'Enter new ' + labelText + ' name'"
      :disabled="disabled"
    />
    <button
      @click="createNewOption"
      :class="[
        'ml-2 p-2 bg-blue-500 text-white rounded-md cursor-pointer',
        {
          'bg-gray-400 cursor-not-allowed':
            disabled || alreadyPresent || !inputText,
        },
      ]"
      :disabled="disabled || alreadyPresent || !inputText"
    >
      save
    </button>
    <span class="ms-2">or</span>
    <button
      @click="showSelect = !showSelect"
      class="ml-2 p-2 bg-blue-500 text-white rounded-md"
      :class="{ 'cursor-not-allowed bg-gray-400': disabled }"
      :disabled="disabled"
    >
      Select
    </button>
  </div>
  <div :class="['text-red op-0', { 'op-100': alreadyPresent }]">
    Already Present
  </div>
  <div v-if="!!exclude" class="flex justify-center">
    <input
      class="p-0 m-0 hidden"
      type="checkbox"
      @change="disableAll"
      :value="exclude"
      id="exclude-value"
    />
    <label for="exclude-value">
      <span class="text-sm bg-red px-4 py-2 rounded-2xl text-white">Don't use {{ labelText }}</span>
      <svg
        class="w-5 h-5 op-0 bg-green rounded-full translate-x-1 translate-y-1 text-white"
        :class="{ 'op-100': disabled }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
    </label>
  </div>
  <br />
</template>
