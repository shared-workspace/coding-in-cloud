<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, ref } from 'vue'
import PopupMessage from './PopupMessage.vue'

const props = defineProps<{
  labelText: string
  choices: Map<string, boolean>
  updatedChoices: Array<any>
  create: (value: string) => Promise<{ success: boolean }>
  save: () => void
  toggleChoice: (value: string) => void
  delete: (value: string) => void
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
  props.toggleChoice(choice)
  const newChoices = new Map(props.choices)
  newChoices.set(choice, value)
  emits('update:choices', newChoices)
}
const deleteChoise = ref('')
const showConfirmPopup = ref(false)
const callbackDelete = () => {
  showConfirmPopup.value = false
  props.delete(deleteChoise.value)
}
const confirmDelete = (choise: string) => {
  if (choise) {
    deleteChoise.value = choise
    showConfirmPopup.value = true
  }
}
</script>
<template>
  <PopupMessage
    v-if="showConfirmPopup"
    type="warning"
    :title="deleteChoise"
    :message="'Are you sure you want to delete ' + labelText + ' '"
    :callback="callbackDelete"
    v-model:show="showConfirmPopup"
  />
  <div class="text-3xl mb-4">{{ labelText }}</div>
  <div class="flex items-center justify-center">
    <input
      v-model="inputText"
      class="w-1/2 p-2 border border-gray-300 rounded-md"
      :placeholder="'Enter new ' + props.labelText + ' name'"
    />
    <button
      @click="createNewOption"
      :class="[
        'ml-2 p-2 bg-blue-500 text-white rounded-md cursor-pointer',
        { 'bg-gray-400 cursor-not-allowed': alreadyPresent || !inputText },
      ]"
      :disabled="alreadyPresent || !inputText"
    >
      create
    </button>
    <button
      @click="save"
      :class="[
        'ml-2 p-2 rounded-md',
        updatedChoices.length !== 0
          ? 'bg-green-500 cursor-pointer text-white'
          : 'bg-gray-400 cursor-not-allowed',
      ]"
      :disabled="updatedChoices.length === 0"
    >
      save
    </button>
  </div>
  <div :class="['text-red op-0 mb-4', { 'op-100': alreadyPresent }]">
    Already Present
  </div>
  <div class="flex items-center justify-center flex-wrap gap-4">
    <div v-for="([choice, checked], i) in props.choices" :key="i">
      <input
        type="checkbox"
        :value="choice"
        :checked="checked"
        class="hidden"
        @change="
          updateChoice(choice, !checked)
        "
        :id="choice.toLowerCase().replace(' ', '-')"
      />
      <label
        :for="choice.toLowerCase().replace(' ', '-')"
        class="flex rounded-full cursor-pointer text-sm px-3 py-2"
        :class="[
          props.choices.get(choice)
            ? 'bg-green-500 text-white'
            : 'bg-white text-black',
        ]"
      >
        <span>{{ choice }}</span>
        <!-- tick svg -->
        <div class="flex justify-center items-center">
          <svg
            v-if="props.choices.get(choice)"
            class="w-4 h-4 mx-1"
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
        </div>
        <button
          class="bg-red w-5 h-5 text-sm rounded-full flex justify-center items-center line-height-none pb-1 translate-x-5 -translate-y-4 cursor-pointer hover:scale-150 transition-transform duration-200"
          @click="confirmDelete(choice)"
        >
          x
        </button>
      </label>
    </div>
  </div>
  <br />
</template>
