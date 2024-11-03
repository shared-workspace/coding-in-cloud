<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  labelText: String,
  mainName: String,
  mainOptions: Array as PropType<string[]>,
})

const emits = defineEmits(['update:mainName', 'update:mainOptions']);

const localName = computed({
  get: () => props.mainName,
  set: (value) => emits('update:mainName', value)
})

const localOptions = computed({
  get: () => props.mainOptions,
  set: (value) => emits('update:mainOptions', value)
})

defineExpose({
  resetForm() {
    localName.value = '';
    localOptions.value = [];
  },
  updateOptions(){
    if (localName.value && localOptions.value && !localOptions.value.includes(localName.value)) {
      localOptions.value = [...localOptions.value, localName.value];
    }
  }
})

</script>
<template>
  <label>{{ labelText }}</label>
  <input
    v-model="localName"
    type="text"
    :placeholder="'Enter ' + labelText"
    :required="!localName"
  />
  <div class="">or</div>
  <select v-model="localName" :required="!localName">
    <option value="" disabled selected>Select {{ labelText }}</option>
    <option v-for="name in localOptions" :key="name" :value="name">
      {{ name }}
    </option>
  </select>
</template>
