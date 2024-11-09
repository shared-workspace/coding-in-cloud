import { computed, reactive, ref } from 'vue'
import { useLoading } from './useLoading'
const { setLoading } = useLoading()

export interface Feature {
  _id: string
  name: string
  filters: string[]
}

// const dummyFilters = Array.from({ length: 10 }, (_, i) => 'Filter ' + i)

// const dummyFeatures: Feature[] = Array.from({ length: 10 }, (_, i) => ({
//   name: 'Feature ' + i,
//   filters: Array.from(
//     { length: 5 },
//     (_, j) =>
//       dummyFilters[Math.floor(Math.random() * dummyFilters.length)] + ' ' + j,
//   ),
// }))

// export function randomFeature(n: number) {
//   const index = Array.from({ length: dummyFeatures.length }, (_, i) => i)
//   const features = Array.from({ length: n }, () => {
//     const i = Math.floor(Math.random() * index.length)
//     return dummyFeatures[index.splice(i, 1)[0]]
//   })
//   return features
// }

export interface FeatureEntity {
  used: boolean
  filters: Map<string, boolean>
}

const featureOptions = ref<Feature[]>([])
const featureEntries = reactive<Map<string, FeatureEntity>>(new Map())
const featureEntriySelected = ref<string | null>(null)
const filterUsing = ref<string | null>(null)
const hasNoFilter = ref(false)

async function fetchFeatureOptions() {
  setLoading(true, 'Fetching Features')
  const res = await $http.get<Feature[]>('/api/feature/all').then(res => res.data)
  if (res && res.length) {
    featureOptions.value = res
    featureEntries.clear()
    featureOptions.value.forEach(({ name, filters }) => {
      featureEntries.set(name, {
        used: false,
        filters: new Map(filters.map(filter => [filter, false])),
      })
    })
  }
  setLoading(false, '')
}
await fetchFeatureOptions()

export function initFeatureEntries(features: string[]) {
  const updatedEntries = new Map()
  for (const [name, { filters }] of featureEntries) {
    updatedEntries.set(name, { used: features.includes(name), filters })
  }
  featureEntries.clear()
  updatedEntries.forEach((value, key) => featureEntries.set(key, value))
}

async function createFeature(name: string, callback: () => void) {
  setLoading(true, 'Creating Feature')
  const res = await $http.post<Feature>('/api/feature', { name }).then(res => res.data)
  if (!res) return { success: false }
  const newFeature = res
  featureOptions.value = [...featureOptions.value, newFeature]
  featureEntries.set(newFeature.name, { used: false, filters: new Map() })
  callback()
  setLoading(false, '')
}

async function createFilter(filter: string) {
  setLoading(true, 'Creating Filter')
  const activeFeature = featureEntriySelected.value
    ? featureEntries.get(featureEntriySelected.value)
    : null
  if (activeFeature) {
    const updatedFilters = await new Promise<Map<string, boolean>>(resolve =>
      setTimeout(
        () => resolve(new Map(activeFeature.filters.set(filter, false))),
        2_000,
      ),
    )
    const updatedEntry = { used: true, filters: updatedFilters }
    featureEntries.set(featureEntriySelected.value!, updatedEntry)
    // also update the featureOptions
    const updatedOptions = featureOptions.value.map(option => {
      if (option.name === featureEntriySelected.value) {
        return { ...option, filters: [...option.filters, filter] }
      }
      return option
    })
    featureOptions.value = updatedOptions
  } else {
    console.error(
      'Something unexpected happened while creating a filter parent feature not found',
    )
  }
  setLoading(false, '')
  return { success: true }
}

async function deleteFilter(callback = () => {}) {
  const filter = filterUsing.value
  if (filter) {
    if (featureEntriySelected.value) {
      setLoading(true, 'Deleting Filter')
      const activeFeature = featureEntries.get(featureEntriySelected.value)
      if (activeFeature) {
          const id = featureOptions.value.find(({ name }) => name === featureEntriySelected.value)?._id
          if (!id) {
            console.error('Something unexpected happened while deleting a filter parent feature not found')
            return { success: false }
          }
        const updatedFilters = await $http.put<string[]>('/api/feature/' + id, { filter }).then(res => {
          if (!res.data.includes(filter)) activeFeature.filters.delete(filter)
            return activeFeature.filters
        })
        const updatedEntry = { used: true, filters: updatedFilters }
        featureEntries.set(featureEntriySelected.value, updatedEntry)
        // also update the featureOptions
        const updatedOptions = featureOptions.value.map(option => {
          if (option.name === featureEntriySelected.value) {
            return {
              ...option,
              filters: option.filters.filter(f => f !== filter),
            }
          }
          return option
        })
        featureOptions.value = updatedOptions
        return { success: true }
      } else {
        console.error(
          'Something unexpected happened while deleting a filter parent feature not found',
        )
      }
      setLoading(false, '')
    } else {
      console.error(
        'Something unexpected happened while deleting a filter parent feature not found',
      )
    }
    callback()
  } else {
    console.error('Something unexpected happened while deleting a filter')
  }
  return { success: false }
}

export function useFeature() {
  return {
    featureEntries,
    featureSelectedEntry: computed({
      get: () => featureEntriySelected.value,
      set: (value: string) => {
        const entry = featureEntries.get(value)
        if (entry) {
          featureEntriySelected.value = value
        } else {
          console.error(
            'Something unexpected happened while selecting a feature entry',
          )
          featureEntriySelected.value = null
        }
      },
    }),
    filters: computed(() => {
      const selected = featureEntriySelected.value
      if (!selected) return []
      const entry = featureEntries.get(selected)
      if (!entry) return []
      const filters = featureOptions.value.find(
        ({ name }) => name === selected,
      )?.filters
      console.log('filters', filters)
      return filters || []
    }),
    deselectFeatureEntry() {
      featureEntriySelected.value = null
    },
    createFeature,
    createFilter,
    toggleDontUseFilter() {
      return (hasNoFilter.value = !hasNoFilter.value)
    },
    filterUsed: computed({
      get: () => filterUsing.value || '',
      set: (value: string) => {
        filterUsing.value = value
      },
    }),
    deleteFilter,
  }
}
