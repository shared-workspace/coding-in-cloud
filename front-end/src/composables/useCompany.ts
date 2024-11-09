/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  initCategoryChoices,
  // randomCategory,
  type Category,
} from './useCategory'
import { computed, ref, watch } from 'vue'

import { useLoading } from './useLoading'
import { initFeatureEntries, type Feature } from './useFeature'
const { setLoading } = useLoading()

interface Company {
  _id?: string
  name: string
  categories: Category[]
  features: Feature[]
  imageGroups: any[]
}

const companiesOptions = ref<Company[]>([])
const companySelected = ref<Company | null>(null)

watch(
  () => companySelected.value,
  value => {
    if (value && value.categories.length)
      initCategoryChoices(value.categories.map(category => category.name))
    if (value && value.features.length)
      initFeatureEntries(value.features.map(feature => feature.name))
  },
)

async function fetchCompanyOptions() {
  setLoading(true, 'Fetching Companies')
  const res = await $http.get<Company[]>('/api/company/all').then(res => res.data)
  if (res && res.length) companiesOptions.value = res;
  setLoading(false, '')
}
await fetchCompanyOptions()

async function createCompany(name: string) {
  setLoading(true, 'Creating Company')
  const res = await $http.post<Company>('/api/company', { name }).then(res => res.data)
  if (!res) return { success: false }
  companiesOptions.value.push(res)
  initCategoryChoices([])
  initFeatureEntries([])
  setLoading(false, '')
  return { success: true }
}

async function deleteCompany(callback = () => {}) {
  if (companySelected.value) {
    setLoading(true, 'Deleting Company')
    const id = companySelected.value._id
    if (!id) {
      console.error('Something unexpected happened company id not found')
      return { success: false }
    }
    const res = await $http
      .delete('/api/company/' + id)
      .then(res => res.data).catch(err => (console.error(err), null))
    if (res !== 1) return { success: false }
    companiesOptions.value = companiesOptions.value.filter(
      company => company.name !== companySelected.value?.name,
    )
    companySelected.value = null
    callback()
    setLoading(false, '')
    return { success: true }
  } else {
    console.error('Something unexpected happened company not found')
  }
  return { success: false }
}

async function updateCompanyCategories(
  categories: Category[],
  callback: () => void,
) {
  if (companySelected.value) {
    const id = companySelected.value._id
    if (!id) {
      console.error('Something unexpected happened company id not found')
      return { success: false, message: 'Selected company id found' }
    }
    const categoriesIds = categories.map(category => category._id)
    setLoading(true, 'Updating Company Categories')
    const res = await $http
      .put<Category[]>('/api/company/', { _id: id, categories: categoriesIds })
      .then(res => res.data)
    if (!res) return { success: false, message: 'Something went wrong' }
    const i = companiesOptions.value.findIndex(
      company => company._id === id,
    )
    companiesOptions.value = [
      ...companiesOptions.value.slice(0, i),
      { ...companiesOptions.value[i], categories: res },
      ...companiesOptions.value.slice(i + 1),
    ]
    companySelected.value = companiesOptions.value[i]
    callback()
    setLoading(false, '')
  } else {
    console.error('Something unexpected happened company not found')
    return { success: false, message: 'Selected company not found' }
  }
}

export function useCompany() {
  return {
    companies: computed(() =>
      companiesOptions.value.map(company => company.name),
    ),
    selectedCompany: computed({
      get: () => companySelected.value?.name || '',
      set: name => {
        if (!name) {
          companySelected.value = null
          return
        }
        const company = companiesOptions.value.find(
          company => company.name === name,
        )
        if (company) {
          companySelected.value = company
        } else {
          companySelected.value = null
          console.error(
            'Something unexpected happened company not found in the list',
          )
        }
      },
    }),
    createCompany,
    updateCompanyCategories,
    deleteCompany,
  }
}
