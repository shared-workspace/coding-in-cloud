import { defineStore } from 'pinia'
import { StoreKeys } from '../storeKeys'
import { useCompanyStore } from './company'
import { watch } from 'vue'
const useCategoryNameListStore = defineStore(StoreKeys.CategoryNameList, {
  state: () => ({
    isLoaded: false,
    nameList: [] as string[],
  }),
  actions: {
    setNameList(newNameList: string[]) {
      this.nameList = newNameList
    },
    fetchNameList(company: string) {
      if (!company) return []
      this.isLoaded = false
      $fetch('/api/category-list', { query: { company } })
        .then(res => {
          if (res && res['200']) {
            this.setNameList(res['200'])
          }
        })
        .catch(err => console.error(err))
        .finally(() => (this.isLoaded = true))
    },
  },
  persist: !true,
})

export const useCategoryStore = defineStore(
  StoreKeys.Category,
  (() => {
    const category = useCategoryNameListStore()
    const company = useCompanyStore()

    watch(
      () => company.activeName,
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal && company.nameList.includes(newVal)) {
          category.fetchNameList(newVal)
        }
      },
    )
    return {
      state: () => ({
        nameSelectedList: [] as string[],
      }),
      getters: {
        isLoaded: () => {
          if (!category.nameList.length && !category.isLoaded) {
            category.fetchNameList(company.activeName)
          }
          return category.isLoaded
        },
        nameList: () => category.nameList,
      },
      actions: {
        setNameList: category.setNameList,
        setSelectedNameList(newNameList: string[]) {
          this.nameSelectedList = newNameList
        },
        persist: !true,
      },
    }
  })(),
)
