import { defineStore } from 'pinia'
import { StoreKeys } from '../storeKeys'
import { useCompanyStore } from './company'
import { useFeatureStore } from './feature'

const useFilterNameListStore = defineStore(StoreKeys.FilterNameList, {
  state: () => ({
    isLoaded: false,
    nameList: [] as string[],
  }),
  actions: {
    setNameList(newNameList: string[]) {
      this.nameList = newNameList
    },
    fetchNameList(company: string, feature: string) {
      $fetch('/api/filter-list', { query: { company, feature } })
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

export const useFilterStore = defineStore(StoreKeys.Filter, {
  state: () => ({
    activeName: '',
  }),
  getters: {
    isLoaded: () => useFilterNameListStore().isLoaded,
    nameList: async () => {
      const store = useFilterNameListStore()
      if (!store.nameList.length && !store.isLoaded) {
        return store.fetchNameList(
          useCompanyStore().activeName,
          useFeatureStore().activeName,
        )
      }
      return store.nameList
    },
  },
  actions: {
    setName(newName: string) {
      this.activeName = newName
    },
    mergeActiveName() {
      const store = useFilterNameListStore()
      if (this.activeName && !store.nameList.includes(this.activeName)) {
        store.setNameList([...store.nameList, this.activeName])
      }
    },
  },
  persist: !true,
})
