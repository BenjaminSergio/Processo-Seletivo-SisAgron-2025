<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg shadow-2">
      <q-card-section class="text-center">
        <div class="text-h5">Home</div>
        <q-separator />
      </q-card-section>

      <q-card-actions vertical align="center">
        <q-btn color="primary" label="Inserir Nota Fiscal" to="/novaNota" class="q-mb-md" />
        <q-btn
          color="secondary"
          label="Visualizar Notas Fiscais"
          to="/visualisarNotas"
          class="q-mb-md"
        />
        <q-btn color="negative" label="Sair" @click="sair" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthDocStore } from 'src/stores/auth'

const router = useRouter()
const authStore = useAuthDocStore()
const doc = authStore.authDoc

onMounted(() => {
  console.log('Valor armazenado em doc:', doc)
})

const sair = () => {
  authStore.setAuthDoc('') // Limpa o CPF/CNPJ armazenado
  router.push('/') // Retorna para a tela de login
}
</script>
