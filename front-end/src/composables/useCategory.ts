/* eslint-disable @typescript-eslint/no-unused-vars */
// import type { Types } from "mongoose"
import { computed, ref } from 'vue'
import { useLoading } from './useLoading'
const { setLoading } = useLoading()

export interface Category {
  _id?: string
  name: string
}

// const dummyCategories: Category[] = Array.from({ length: 10 }, (_, i) => ({
//   name: 'Category ' + i
// }))

// export function randomCategory(n: number) {
//   const index = Array.from({ length: dummyCategories.length }, (_, i) => i)
//   const categories = Array.from({ length: n }, () => {
//     const i = Math.floor(Math.random() * index.length)
//     return dummyCategories[index.splice(i, 1)[0]]
//   })
//   return categories
// }

const categoryOptions = ref<Category[]>([])
// Map is used to show selected and unselected categories
const categoryChoices = ref<Map<string, boolean>>(new Map())
const categoriesUpdateRequire = ref(false)
// bellows are used to track changes in categories for database update
const categoriesChoicesUpdated = ref<Category[]>([])

async function fetchCategoryOptions() {
  setLoading(true, 'Fetching Categories')
  const res = await $http
    .get<Category[]>('/api/category/all')
    .then(res => res.data).catch(err => (console.error(err), null))
  if (res && res.length) {
    categoryOptions.value = res
    categoryChoices.value = new Map(
      categoryOptions.value.map(option => [option.name, false]),
    )
  }
  setLoading(false, '')
}
await fetchCategoryOptions()
export function initCategoryChoices(categories: string[]) {
  const updatedChoices = new Map(categoryChoices.value)
  updatedChoices.forEach((_, key) =>
    updatedChoices.set(key, categories.includes(key)),
  )
  categoryChoices.value = updatedChoices
  categoriesChoicesUpdated.value = []
}

async function createCategory(name: string) {
  setLoading(true, 'Creating Category')
  const res = await $http.post<Category>('/api/category', { name }).then(res => res.data).catch(err => (console.error(err), null))
  if (!res) return { success: false, message: 'Category not created' }
  const newCategory = res;
  categoryOptions.value = [...categoryOptions.value, newCategory]
  const newMap = new Map(categoryChoices.value)
  newMap.set(name, false)
  categoryChoices.value = newMap
  setLoading(false, '')
  return { success: true, message: 'Category created' }
}

async function deleteCategory(name: string) {
  setLoading(true, 'Deleting Category')
  const id = categoryOptions.value.find(category => category.name === name)?._id
  if (!id) {
    console.error('Something Unexpected Happened Category ID not found')
    return { success: false, message: 'Category not deleted' }
  }
  const res = await $http.delete<number>(`/api/category/${id}`).then(res => res.data).catch(err => (console.error(err), null))
  if (!res && res !== 1) return { success: false, message: 'Category not deleted' }
  categoryOptions.value = categoryOptions.value.filter(category => category.name !== name)
  const newMap = new Map(categoryChoices.value)
  newMap.delete(name)
  categoryChoices.value = newMap
  setLoading(false, '')
  return { success: true, message: 'Category deleted' }
}

// return array of ids of selected categories
function selectedCategories(): string[] {
  const categoriesMap = categoryChoices.value
  const categories = categoryOptions.value
  const categoriesId = Array.from(categoriesMap)
    .filter(([_, value]) => value)
    .map(([key]) => categories.find(category => category.name === key)?._id)
    .filter(id => id)
  return categoriesId as string[]
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
      },
    }),
    createCategory,
    categoriesUpdateRequire,
    selectedCategories,
    deleteCategory,
    updatedCategories: computed(() => categoriesChoicesUpdated.value),
    toggleCategoryChoice(name: string) {
      // if category is in the list, remove it
      if (categoriesChoicesUpdated.value.find(category => category.name === name)) {
        categoriesChoicesUpdated.value = categoriesChoicesUpdated.value.filter(
          category => category.name !== name,
        )
      } else {
        // if category is not in the list, add it
        const category = categoryOptions.value.find(category => category.name === name)
        if (category) categoriesChoicesUpdated.value = [...categoriesChoicesUpdated.value, category]
      }        
    },
    resetUpdatedCategories: () => categoriesChoicesUpdated.value = [],
  }
}
