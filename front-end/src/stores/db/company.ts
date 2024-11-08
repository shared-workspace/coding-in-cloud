import { defineStore } from 'pinia'
import { StoreKeys } from '../storeKeys'

const useCompanyNameListStore = defineStore(StoreKeys.CompanyNameList, {
  state: () => ({
    isLoaded: false,
    nameList: [] as string[],
  }),
  actions: {
    setNameList(newNameList: string[]) {
      this.nameList = newNameList
    },
    fetchNameList() {
      this.isLoaded = false
      $fetch('/api/company-list', {})
        .then(res => {
          if (res && res['200']) {
            console.log("res['200']: ", res['200'])
            this.setNameList(res['200'])
          }
        })
        .catch(err => console.error(err))
        .finally(() => (this.isLoaded = true))
    },
  },
  persist: !true,
})

export const useCompanyStore = defineStore(
  StoreKeys.Company,
  (() => {
    const company = useCompanyNameListStore()

    return {
      state: () => ({
        activeName: '',
      }),
      getters: {
        isLoaded: () => {
          if (!company.nameList.length && !company.isLoaded) {
            company.fetchNameList()
          }
          return company.isLoaded
        },
        nameList: () => company.nameList,
      },
      actions: {
        setName(newName: string) {
          this.activeName = newName
        },
        setNameList: company.setNameList,
      },
      persist: !true,
    }
  })(),
)
