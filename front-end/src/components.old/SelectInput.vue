<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  labelText: String,
  mainName: String,
  mainOptions: Array as PropType<string[]>,
})

const showSelect = computed(() => !!props.mainOptions)
const editFlag = ref(false)
const isNew = computed(
  () => !localOptions.value?.includes(localName.value || ''),
)
const editable = computed(() => editFlag.value || isNew.value)
const toggleEditable = () => {
  editFlag.value = !editFlag.value
}
const emits = defineEmits(['update:mainName', 'update:mainOptions'])

const localName = computed({
  get: () => props.mainName,
  set: value => emits('update:mainName', value),
})

const localOptions = computed({
  get: () => props.mainOptions,
  set: value => emits('update:mainOptions', value),
})

defineExpose({
  resetForm() {
    localName.value = ''
    if (showSelect.value) localOptions.value = []
  },
  updateOptions() {
    if (
      localName.value &&
      localOptions.value &&
      !localOptions.value.includes(localName.value)
    ) {
      localOptions.value = [...localOptions.value, localName.value]
    }
  },
})
</script>
<template>
  <label>{{ labelText }}</label>
  <div v-if="showSelect">
    <select v-model="localName" :required="!localName">
      <option value="" disabled selected>Select {{ labelText }}</option>
      <option v-for="name in localOptions" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
    <div class="relative flex justify-end w-full px-8">
      <button
        v-if="editable"
        class="text-black bg-zinc-4 hover:bg-white px-4 py-2 rounded-2xl mx-2 -translate-y-[2rem] cursor-pointer"
        @click="toggleEditable"
      >
        update
      </button>
      <button
        v-else
        class="text-black bg-zinc-4 hover:bg-white px-4 py-2 rounded-2xl mx-2 -translate-y-[2rem] cursor-pointer"
        @click="toggleEditable"
      >
        edit
      </button>
    </div>
    <div class="">
      or
      <span v-if="isNew">create new</span>
      <span v-else>edit name</span>
    </div>
  </div>
  <input
    v-model="localName"
    type="text"
    :placeholder="'Enter ' + labelText"
    :required="!localName"
    :disabled="!editable"
  />
  <div class="relative flex justify-end w-full px-8">
    <button
      v-if="editable"
      class="text-black bg-zinc-4 hover:bg-white px-4 py-2 rounded-2xl mx-2 -translate-y-[2rem] cursor-pointer"
      @click="toggleEditable"
    >
      update
    </button>
    <button
      v-else
      class="text-black bg-zinc-4 hover:bg-white px-4 py-2 rounded-2xl mx-2 -translate-y-[2rem] cursor-pointer"
      @click="toggleEditable"
    >
      edit
    </button>
  </div>
</template>
