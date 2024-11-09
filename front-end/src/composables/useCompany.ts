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
    setLoading(true, 'Deleting Company')
    console.log('companySelected.value', companySelected.value)
    const c = companySelected.value as any;
    console.log('c, c_id', c, c._id)
    const res = await $http
      .delete('/api/company/' + c._id)
      .then(res => res.data)
      console.log('res', res)
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
  categories: string[],
  callback: () => void,
) {
  if (companySelected.value) {
    companySelected.value.categories = categories.map(name => ({ name }))
    setLoading(true, 'Updating Company Categories')
    await new Promise<void>(resolve => setTimeout(resolve, 2_000))
    callback()
    setLoading(false, '')
  } else {
    console.error('Something unexpected happened company not found')
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
