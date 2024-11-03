import { ref } from "vue";

export function useSelectInput() {
  const inputRef = ref('')
  const setInput = (value: string) => {
    inputRef.value = value
  }
  const inputOption = ref<string[]>([])
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
  return {
    inputRef,
    setInput,
    inputOption,
    addToInputOption,
    clearInput,
    clearInputOption
  }
}
