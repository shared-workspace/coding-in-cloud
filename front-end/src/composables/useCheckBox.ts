import { ref } from "vue"

export function useCheckBoxInput() {
  const inputRef = ref('')
  const inputOption = ref<string[]>([])
  const selectedInputOption = ref<string[]>([])
  const addToInputOption = (value: string) => {
    if (value && typeof value === 'string' && !inputOption.value.includes(value)) {
      inputOption.value.push(value)
    }
  }
  const clearInput = () => {
    inputRef.value = ''
  }
  const clearInputOption = () => {
    inputOption.value = []
  }
  const toggleSelectedInput = (value: string) => {
    if (!value || typeof value !== 'string') return
    if (selectedInputOption.value.includes(value)) {
      selectedInputOption.value = selectedInputOption.value.filter(item => item !== value)
    } else {
      selectedInputOption.value.push(value)
    }
  }
  return {
    inputRef,
    inputOption,
    selectedInputOption,
    addToInputOption,
    clearInput,
    clearInputOption,
    toggleSelectedInput
  }
}
