<script lang="ts" setup>
import { computed } from 'vue'
import type { FilterOptions } from '../composables/useData'

const props = defineProps<{
  featureActiveName: string
  filterOptions: FilterOptions[]
  filterActive: FilterOptions | null
  featureSave: () => void
  closePanel: () => void
}>()

const filterPanelProps = {
  filterActive: props.filterActive,
  filterOptions: props.filterOptions,
  filterSave: () => {
    const filter = props.filterActive!
    const index = filterOptions.findIndex(f => f.name === filter.name)
    if (index === -1) {
      filterOptions.value.push(filter)
    } else {
      filterOptions.value[index] = filter
    }
  },
}

const filterSave = () => {
  const filter = filterActive.value!
  const index = filterOptions.value.findIndex(f => f.name === filter.name)
  if (index === -1) {
    filterOptions.value.push(filter)
  } else {
    filterOptions.value[index] = filter
  }
}
// const localCompanyName = computed({
//   get: () => parentCompanyName || '',
//   set: (value: string) => parentSetFeatureName?.(value)
// })

// const localFeatureName = computed({
//   get: () => parentFeatureName || '',
//   set: (value: string) => parentSetFeatureName?.(value),
// })

// const localFilterName = computed({
//   get: () => parentFilterName || '',
//   set: (value: string) => parentSetFilterName?.(value),
// })

// const localFilterOptions = computed({
//   get: () => parentFilterOptions || [],
//   set: (value: FilterOptions[]) => parentSetFilterOptions?.(value),
// })
</script>
<template>
  <div class="text-white">
    feature
  </div>
</template>
