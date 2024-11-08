/* eslint-disable @typescript-eslint/no-unused-vars */
// import type { Types } from "mongoose"
import { computed, ref } from 'vue'
import { useLoading } from './useLoading'
const { setLoading } = useLoading()

export interface Category {
  // _id: Types.ObjectId
  name: string
}

const dummyCategories: Category[] = Array.from({ length: 10 }, (_, i) => ({
  name: 'Category ' + i
}))

export function randomCategory(n: number) {
  const index = Array.from({ length: dummyCategories.length }, (_, i) => i)
  const categories = Array.from({ length: n }, () => {
    const i = Math.floor(Math.random() * index.length)
    return dummyCategories[index.splice(i, 1)[0]]
  })
  return categories
}

const categoryOptions = ref<Category[]>([])
const categoryChoices = ref<Map<string, boolean>>(new Map())
const categoriesUpdateRequire = ref(false)


async function fetchCategoryOptions() {
  setLoading(true, 'Fetching Categories')
  const options = await new Promise<Category[]>(resolve => {
    setTimeout(() => {
      resolve(dummyCategories)
    }, 2_000)
  })
  categoryOptions.value = options
  categoryChoices.value = new Map(options.map(option => [option.name, false]))
  setLoading(false, '')
}
await fetchCategoryOptions();
export function initCategoryChoices(categories: string[]) {
  const updatedChoices = new Map(categoryChoices.value)
  updatedChoices.forEach((_, key) => updatedChoices.set(key, categories.includes(key)))
  categoryChoices.value = updatedChoices
}

async function createCategory(name: string) {
  setLoading(true, 'Creating Category')
  const newCategory = await new Promise<Category>(resolve => {
    setTimeout(() => {
      resolve({ name })
    }, 2_000)
  })
  categoryOptions.value = [...categoryOptions.value, newCategory]
  const newMap = new Map(categoryChoices.value)
  newMap.set(name, false)
  categoryChoices.value = newMap
  setLoading(false, '')
  return { success: true, message: 'Category created' }
}

function selectedCategories(): string[] {
 return Array.from(categoryChoices.value)
    .filter(([_, value]) => value)
    .map(([key]) => key)
}

// MARK: - Category Fetch
// $fetch('/api/category-options', {})
//   .then(res => {
//     if (res && res['200']) {
//       categoryOptions.value = res['200'].names
//     }
//   })
//   .catch(err => console.error(err))
//   .finally(() => (fetchingCategoryOptions.value = false))

export function useCategory() {
  return {
    categories: computed({
      get: () => categoryChoices.value,
      set: (value: Map<string, boolean>) => {
        if (!categoriesUpdateRequire.value) categoriesUpdateRequire.value = true
        categoryChoices.value = value
      }
    }),
    createCategory,
    categoriesUpdateRequire,
    selectedCategories,
  }
}
