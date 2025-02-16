import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthDocStore = defineStore('authDoc', {
  state: () => ({
    authDoc: ""
  }),
  getters: {
    getDoc(){
      return this.authDoc
    }
  },
  actions: {
    setDocument(doc){
      this.authDoc = doc;
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthDocStore, import.meta.hot))
}
