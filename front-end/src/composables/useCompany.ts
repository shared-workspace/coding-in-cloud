import {
  initCategoryChoices,
  randomCategory,
  type Category,
} from './useCategory'
import { computed, ref, watch } from 'vue'

import { useLoading } from './useLoading'
import { initFeatureEntries, randomFeature, type Feature } from './useFeature'
const { setLoading } = useLoading()

interface Company {
  name: string
  categories: Category[]
  features: Feature[]
}

const dummyCompanies: Company[] = Array.from({ length: 10 }, (_, i) => ({
  name: 'Company ' + i,
  categories: randomCategory(3),
  features: randomFeature(5),
}))

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
  const options = await new Promise<Company[]>(resolve => {
    setTimeout(() => {
      resolve(dummyCompanies)
    }, 3_000)
  })
  companiesOptions.value = options
  setLoading(false, '')
}
await fetchCompanyOptions()

async function createCompany(name: string) {
  setLoading(true, 'Creating Company')
  const newCompany = await new Promise<Company>(resolve => {
    setTimeout(() => {
      resolve({
        name,
        categories: [],
        features: [],
      })
    }, 3_000)
  })
  companiesOptions.value.push(newCompany)
  initCategoryChoices([])
  initFeatureEntries([])
  setLoading(false, '')
  return { success: true }
}

async function deleteCompany(callback = () => {}) {
  if (companySelected.value) {
    setLoading(true, 'Deleting Company')
    await new Promise<void>(resolve => setTimeout(resolve, 2_000))
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

async function updateCompanyCategories(categories: string[], callback: () => void) {
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
