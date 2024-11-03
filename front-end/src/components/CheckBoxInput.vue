<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'

const errorFlag = ref(false)

defineExpose({
  showError: () => {
    errorFlag.value = true
  },
})

const props = defineProps({
  labelText: String,
  mainName: String,
  mainOptions: Array as PropType<string[]>,
  mainOptionsSelected: Array as PropType<string[]>,
})

const emits = defineEmits(['update:mainName', 'update:mainOptions', 'update:mainOptionsSelected'])

const localName = computed({
  get: () => props.mainName,
  set: (value) => emits('update:mainName', value),
})

const localOptions = computed({
  get: () => props.mainOptions ?? [],
  set: (value) => emits('update:mainOptions', value),
})

const localOptionsSelected = computed({
  get: () => props.mainOptionsSelected ?? [],
  set: (value) => emits('update:mainOptionsSelected', value),
})

const addNewOption = () => {
  if (localName.value && !localOptions.value.includes(localName.value)) {
    localOptions.value = [...localOptions.value, localName.value]
  }
}

const selectOption = (option: string) => {
  if (localOptionsSelected.value.includes(option)) {
    localOptionsSelected.value = localOptionsSelected.value.filter((item) => item !== option)
  } else {
    localOptionsSelected.value = [...localOptionsSelected.value, option]
  }
}

const removeOption = (option: string) => {
  localOptions.value = localOptions.value.filter((item) => item !== option)
}

</script>
<template>
  <label>{{ labelText }}</label>
  <input
    v-model="localName"
    type="text"
    :placeholder="'Create New ' + labelText + ' label'"
    @keydown.enter="addNewOption"
    :required="localOptionsSelected.length === 0"
  />
  <div
    :class="[
      'text-xs text-red px-3',
      errorFlag && localOptionsSelected.length === 0 ? 'op-100' : 'op-0',
      ]"
  >
    At least 1 label need to be selected ! press enter and select 1
  </div>
  <div class="flex gap-3 flex-wrap">
    <label
      v-for="option in localOptions"
      :key="option"
      class="flex"
    >
      <input
        type="checkbox"
        :value="option"
        :name="option"
        class="hidden"
      />
      <span
        :class="[
          'text-black px-3 py-1 rounded-full text-sm m-2',
          localOptionsSelected.includes(option) ? 'bg-green-6 text-white' : 'bg-white',
        ]"
        @click="() => selectOption(option)"
        >{{ option }}</span
        >
        <span class="bg-red flex justify-center items-center w-5 h-5 rounded-full text-sm translate-y-3" @click="() => removeOption(option)">X</span>
      </label>
  </div>
</template>
