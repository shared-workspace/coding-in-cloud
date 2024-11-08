import { defineStore } from 'pinia'
import { StoreKeys } from '../storeKeys'
import { useCompanyStore } from './company'
import { watch } from 'vue'

const useFeatureNameListStore = defineStore(StoreKeys.FeatureNameList, {
  state: () => ({
    isLoaded: false,
    nameList: [] as string[],
  }),
  actions: {
    setNameList(newNameList: string[]) {
      this.nameList = newNameList
    },
    fetchNameList(company: string) {
      this.isLoaded = false
      $fetch('/api/feature-list', { query: { company } })
        .then(res => {
          if (res && res['200']) {
            this.setNameList(res['200'])
            return res['200']
          }
        })
        .catch(err => console.error(err))
        .finally(() => (this.isLoaded = true))
    },
  },
  persist: !true,
})

export const useFeatureStore = defineStore(StoreKeys.Feature, (()=>{
  const feature = useFeatureNameListStore()
  const company = useCompanyStore()

  watch(
    () => company.activeName,
    (newVal, oldVal) => {
      if (newVal && newVal !== oldVal && company.nameList.includes(newVal)) {
        feature.fetchNameList(newVal)
      }
    }
  )
  return {
    state: () => ({
      activeName: '',
    }),
    getters: {
      isLoaded: () => {
        if (!feature.nameList.length && !feature.isLoaded) {
          feature.fetchNameList(company.activeName)
        }
        return useFeatureNameListStore().isLoaded
      },
      nameList: () => feature.nameList,
    },
    actions: {
      setName(newName: string) {
        this.activeName = newName
      },
      setNameList: feature.setNameList,
    },
    persist: !true,
  }
})())
