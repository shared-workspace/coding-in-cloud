import { useCompanyStore } from "./db/company";
import { useCategoryStore } from "./db/category";
import { useFeatureStore } from "./db/feature";
import { useFilterStore } from "./db/filter";

export function useStore(){
  return {
    company: () => useCompanyStore(),
    category: () =>  useCategoryStore(),
    feature: () =>  useFeatureStore(),
    filter: () =>  useFilterStore(),
  }
}

