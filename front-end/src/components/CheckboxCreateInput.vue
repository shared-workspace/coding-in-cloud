<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps<{
  labelText: string
  choices: Map<string, boolean>
  create: (value: string) => Promise<{ success: boolean }>
  save: () => void
  updateRequired: boolean
}>()
const emits = defineEmits(['update:choices'])
const inputText = ref('')
const alreadyPresent = computed(() => props.choices.has(inputText.value))
const createNewOption = async () => {
  if (inputText.value) {
    const res = await props.create(inputText.value)
    if (res.success) inputText.value = ''
  }
}
const updateChoice = (choice: string, value: boolean) => {
  const newChoices = new Map(props.choices)
  newChoices.set(choice, value)
  emits('update:choices', newChoices)
}
</script>
<template>
  <div class="text-3xl mb-4">{{ labelText }}</div>
  <div class="flex items-center justify-center">
    <input
      v-model="inputText"
      class="w-1/2 p-2 border border-gray-300 rounded-md"
      :placeholder="'Enter new ' + props.labelText + ' name'"
    />
    <button
      @click="createNewOption"
      :class="['ml-2 p-2 bg-blue-500 text-white rounded-md cursor-pointer', { 'bg-gray-400 cursor-not-allowed': alreadyPresent || !inputText }]"
      :disabled="alreadyPresent || !inputText"
    >create</button>
    <button
      @click="save"
      :class="['ml-2 p-2 rounded-md', updateRequired ? 'bg-green-500 cursor-pointer text-white' : 'bg-gray-400 cursor-not-allowed']"
      :disabled="!updateRequired"
    >save</button>
  </div>
  <div :class="['text-red op-0 mb-4', {'op-100': alreadyPresent}]">Already Present</div>
  <div class="flex items-center justify-center flex-wrap gap-4">
    <div v-for="([choice], i) in props.choices" :key="i">
      <input type="checkbox" :value="choice" class="hidden" @change="updateChoice(choice, ($event.target as HTMLInputElement).checked)" :id="choice.toLowerCase().replace(' ', '-')">
      <label :for="choice.toLowerCase().replace(' ', '-')" class="flex rounded-full cursor-pointer text-sm px-3 py-2" :class="[props.choices.get(choice) ? 'bg-green-500 text-white' : 'bg-white text-black']">
        <span>{{ choice }}</span>
        <!-- tick svg -->
        <div class="flex justify-center items-center">
          <svg v-if="props.choices.get(choice)" class="w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        </div>
      </label>
    </div>
  </div>
<br />
</template>
