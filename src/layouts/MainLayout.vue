<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> SisAgron </q-toolbar-title>
        <q-btn label="Sair" icon="person" rounded flat to="/" @click="saveDoc"></q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthDocStore } from 'src/stores/auth'

const authDocStore = useAuthDocStore()
const document = ref('')

// Captura o valor armazenado no Pinia
const doc = authDocStore.authDoc

// Exibe no console ao carregar a página
onMounted(() => {
  console.log('Valor armazenado em doc:', doc)
})

const saveDoc = () => {
  authDocStore.setDocument(document.value)
}
</script>
