import { ref } from "vue";

const isLoading = ref(false);
const loadingMessage = ref('');

export function useLoading() {
  return {
    isLoading,
    loadingMessage,
    setLoading: (loading: boolean, message = '') => {
      isLoading.value = loading;
      loadingMessage.value = message;
    }
  }
}
