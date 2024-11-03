<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { h, ref } from 'vue';

import CheckBoxInput from '../components/CheckBoxInput.vue'
import SelectInput from '../components/SelectInput.vue'

const companyName = ref('')
const companyOptions = ref<string[]>([])

const companySelectRef = ref<{
  resetForm: () => void
  updateOptions: () => void
} | null>(null)

const categoryName = ref('')
const categoryOptions = ref<string[]>([])
const categoryOptionsSelected = ref<string[]>([])

const showCategoryPopup = ref(false)

const createNewCategory = async () => {
  showCategoryPopup.value = true
}

const FormCol = (_: any, { slots }: any) =>
  h(
    'div',
    { class: 'flex flex-col items-center mb-5 max-w-5xl mx-auto' },
    slots.default(),
  )
</script>
<template>
  <div class="text-center max-w-3xl mx-auto">
    <h1 class="py-10">Data Upload</h1>
    <form method="post" @submit.prevent="createNewCategory">
      <FormCol>
        <SelectInput
          ref="companySelectRef"
          labelText="Company Name"
          v-model:main-name="companyName"
          v-model:main-options="companyOptions"
        />
      </FormCol>
      <FormCol>
        <CheckBoxInput
          ref="categoryRef"
          labelText="Category"
          v-model:main-name="categoryName"
          v-model:main-options="categoryOptions"
          v-model:main-options-selected="categoryOptionsSelected"
        />
      </FormCol>
      <button
        class="cursor-pointer py-2 px-4 bg-blue rounded-3xl border-none my-5"
        type="submit"
      >
        Create New Feature Group
      </button>
    </form>
    <div class="m-2 text-black">
      <div class="h-16 bg-white rounded-3xl flex justify-between px-10 items-center">
        <span>Feature Name</span>
        <span>Filters: <span>20</span> </span>
        <span>Image Groups: <span>10</span></span>
        <span>Total Images: <span>50</span></span>
      </div>
    </div>
  </div>
</template>


<style>
input {
  outline: none;
  border: none;
  min-width: 500px;
  border-radius: 1.5rem;
  background: #e5e7eb;
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
}

input[type='checkbox'] {
  margin-right: 0.5rem;
  color: #fff;
}

select {
  outline: none;
  border: none;
  min-width: 500px;
  border-radius: 1.5rem;
  background: #e5e7eb;
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
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

