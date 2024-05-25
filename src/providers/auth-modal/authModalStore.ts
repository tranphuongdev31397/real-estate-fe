import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthModalStore = defineStore('authModal', () => {
  const isOpen = ref<boolean>(false)

  function onOpenChange(open: boolean) {
    isOpen.value = open
  }

  function onOpen() {
    isOpen.value = true
  }

  function onClose() {
    isOpen.value = false
  }

  return {
    isOpen,
    onOpenChange,
    onOpen,
    onClose
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthModalStore, import.meta.hot))
}
