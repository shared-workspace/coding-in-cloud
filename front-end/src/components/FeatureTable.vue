<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useFeature } from '../composables/useFeature'
const { featureEntries, featureSelectedEntry, createFeature } = useFeature()
const selectEntry = (feature: string) => (featureSelectedEntry.value = feature)
const usedFilters = (filters: Map<string, boolean>) => {
  let i = 0
  for (const [, used] of filters) if (used) i++
  return i
}
const alreadyPresent = computed(() => featureEntries.has(inputText.value))
const create = () => {
  if (alreadyPresent.value) return
  createFeature(inputText.value, () => {inputText.value = ''})
}
const inputText = ref('')
const labelText = 'Feature'
</script>
<template>
  <div class="text-3xl mb-5">{{ labelText }}</div>
  <div class="flex items-center justify-center">
    <input
      v-model="inputText"
      class="w-1/2 p-2 border border-gray-300 rounded-md"
      :placeholder="'Enter new ' + labelText + ' name'"
    />
    <button
      @click="create"
      :class="[
        'ml-2 p-2 bg-blue-500 text-white rounded-md cursor-pointer',
        { 'bg-gray-400 cursor-not-allowed': alreadyPresent || !inputText },
      ]"
      :disabled="alreadyPresent || !inputText"
    >
      save
    </button>
  </div>
  <div :class="['text-red op-0', {'op-100': alreadyPresent}]">Feature Already Present</div>
  <div class="">
    <div class="flex items-center justify-center">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-2">Feature</th>
            <th class="p-2">
              Filter status <br />
              Used / Total
            </th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="([feature, { used, filters }], i) in featureEntries"
            :key="i"
            class="text-black"
            :class="[used ? 'bg-green-100' : 'bg-white']"
          >
            <td class="p-2">{{ feature }}</td>
            <td class="p-2">
              {{ usedFilters(filters) }} /
              {{ filters.size }}
            </td>
            <td class="p-2 flex gap-2 justify-end">
              <button
                class="p-2 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-700"
                @click="selectEntry(feature)"
              >
                Open
              </button>
              <button
                :class="[
                  'p-2 text-white rounded-xl',
                  used
                    ? 'bg-red-500 cursor-pointer hover:bg-red-700'
                    : 'bg-gray-400 cursor-not-allowed',
                ]"
                :disabled="!used"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
