import { useLoading } from '../composables/useLoading'
import { ref, watch } from 'vue'

// MARK: - Feature Interface
export interface FeatureOptions {
  name: string
  filterCount: number
  imageGroupCount: number
}

// MARK: - Filter Interface
export interface FilterOptions {
  name: string
  imageGroupCount: number
}

export function useData() {
  const { setLoading } = useLoading()

  // MARK: - Company Start
  const fetchingCompanyOptions = ref(true)
  const companyName = ref('')
  const companyOptions = ref<string[]>([])
  const companyCategoryOptions = ref<string[]>([])
  const onCompanyNameChange = [
    (company: string) => console.log('fetching data for company:', company),
  ]

  watch(
    () => fetchingCompanyOptions.value,
    value => setLoading(value, 'fetching company options'),
  )

  watch(
    () => companyName.value,
    value => {
      if (companyOptions.value.includes(value)) {
        // means value is in database
        onCompanyNameChange.forEach(fn => fn(value))
      }
    },
  )

  // MARK: - Company Fetch
  // $fetch('/api/company-options', {})
  //   .then(res => {
  //     if (res && res['200']) {
  //       companyOptions.value = res['200'].names
  //       companyCategoryOptions.value = res['200'].category
  //     }
  //   })
  //   .catch(err => console.error(err))
  //   .finally(() => (fetchingCompanyOptions.value = false))

  // MARK: - Category Start
  const fetchingCategoryOptions = ref(false)
  // const categoryOptions = ref<string[]>([])
  const categoryOptionsSelected = ref<string[]>([])

  watch(
    () => fetchingCategoryOptions.value,
    value => setLoading(value, 'fetching category options'),
  )

  // MARK: - Category Fetch
  // onCompanyNameChange.push((company: string) => {
  //   fetchingCategoryOptions.value = true
  //   $fetch('/api/category-options', { query: { company } })
  //     .then(res => {
  //       if (res && res['200']) {
  //         categoryOptionsSelected.value = res['200'].map((i) => companyCategoryOptions.value[i])
  //       }
  //     })
  //     .catch(err => console.error(err))
  //     .finally(() => (fetchingCategoryOptions.value = false))
  // })

  // MARK: - Feature Start
  const fetchingFeatureOptions = ref(false)
  const featureActive = ref<FeatureOptions | null>(null)
  const onFeatureNameChange = [
    (company: string, feature: string) =>
      console.log('fetching data for feature:', feature),
  ]

  const featureOptions = ref<FeatureOptions[]>([])

  watch(
    () => fetchingFeatureOptions.value,
    value => setLoading(value, 'fetching feature options'),
  )

  // MARK: - Feature Fetch
  // onCompanyNameChange.push((company: string) => {
  //   fetchingFeatureOptions.value = true
  //   $fetch('/api/feature-options', { query: { company } })
  //     .then(res => {
  //       if (res && res['200']) {
  //         featureOptions.value = res['200']
  //       }
  //     })
  //     .catch(err => console.error(err))
  //     .finally(() => (fetchingFeatureOptions.value = false))
  // })

  // MARK: - Filter Start
  const fetchingFilterOptions = ref(false)
  const filterActive = ref<FilterOptions | null>(null)

  const filterOptions = ref<FilterOptions[]>([])

  watch(
    () => fetchingFilterOptions.value,
    value => setLoading(value, 'fetching filter options'),
  )

  // MARK: - Filter Fetch
  // onFeatureNameChange.push((company: string, feature: string) => {
  //   fetchingFilterOptions.value = true
  //   $fetch('/api/filter-options', { query: { company, feature } })
  //     .then(res => {
  //       if (res && res['200']) {
  //         filterOptions.value = res['200']
  //       }
  //     })
  //     .catch(err => console.error(err))
  //     .finally(() => (fetchingFilterOptions.value = false))
  // })

  // MARK: - Filter Reset
  onCompanyNameChange.push(() => {
    filterOptions.value = []
    filterActive.value = null
  })

  onFeatureNameChange.push(() => {
    filterActive.value = null
  })

  return {
    companyName,
    companyOptions,
    companyCategoryOptions,
    categoryOptionsSelected,
    featureActive,
    featureOptions,
    filterActive,
    filterOptions,
  }
}
