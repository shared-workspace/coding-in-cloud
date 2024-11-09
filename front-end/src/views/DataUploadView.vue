<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import SelectCreateInput from '../components/SelectCreateInput.vue'
import { useCompany } from '../composables/useCompany'
import { useCategory } from '../composables/useCategory'
import CheckboxCreateInput from '../components/CheckboxCreateInput.vue'
import FeatureTable from '../components/FeatureTable.vue'
import { useFeature } from '../composables/useFeature'
import ImageGroupInput from '../components/ImageGroupInput.vue'

const { companies, selectedCompany, createCompany, updateCompanyCategories, deleteCompany } = useCompany()
const { categories, createCategory, deleteCategory, toggleCategoryChoice, resetUpdatedCategories, updatedCategories } = useCategory()
const { featureSelectedEntry, deselectFeatureEntry, filters, createFilter, filterUsed, deleteFilter, toggleDontUseFilter  } = useFeature()
const saveNewCompanyCategories = async () => {
  if (updatedCategories.value.length > 0) {
    await updateCompanyCategories(updatedCategories.value, resetUpdatedCategories);
  }
}
</script>
<template>
  <div class="text-center max-w-3xl mx-auto" :class="{ 'overflow-hidden h-screen': !!featureSelectedEntry }">
    <h1 class="py-10 text-2xl">Data Upload</h1>
    <SelectCreateInput
      labelText="Company"
      :options="companies"
      :create="createCompany"
      :delete="deleteCompany"
      v-model:selected="selectedCompany"
    />
    <CheckboxCreateInput
      v-if="selectedCompany !== ''"
      labelText="Category"
      v-model:choices="categories"
      :create="createCategory"
      :save="saveNewCompanyCategories"
      :updated-choices="updatedCategories"
      :toggle-choice="toggleCategoryChoice"
      :delete="deleteCategory"
    />
    <FeatureTable v-if="selectedCompany !== ''" />
  </div>
  <div
    v-if="!!featureSelectedEntry"
    class="absolute top-0 left-0 w-screen h-screen bg-zinc-800 bg-op-80"
  >
  <div class="text-center max-w-3xl mx-auto mt-10">
      <button
        @click="deselectFeatureEntry"
        class="px-4 py-2 bg-red-500 text-white rounded-xl cursor-pointer hover:bg-red-700 float-end"
      >
        Close
      </button>
      <SelectCreateInput
        labelText="Filter"
        :options="filters"
        :create="createFilter"
        :delete="deleteFilter"
        :exclude="toggleDontUseFilter"
        v-model:selected="filterUsed"
      />
      <ImageGroupInput labelText="Images" />
    </div>
  </div>
</template>

<style>
input {
  outline: none;
  border: none;
  min-width: 100px;
  border-radius: 1.5rem;
  background: #e5e7eb;
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
}

input[type='checkbox'] {
  margin-right: 0.5rem;
  color: #fff;
}

select {
  outline: none;
  border: none;
  min-width: 100px;
  border-radius: 1.5rem;
  background: #e5e7eb;
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
}

select option {
  background: #e5e7eb;
  border: none;
  border-radius: 1.5rem;
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
}
label {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
