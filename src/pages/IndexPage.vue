<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-primary" padding>
        <q-card>
          <q-card-section class="text-center">
            <div class="text-h6">login</div>
            <q-separator />
            <q-card-section>
              <q-input v-model="document" label="Digite seu CPF/CNPJ" outlined :rules="valDoc" />
            </q-card-section>
            <q-separator />
            <q-btn color="primary" to="/home" label="Entrar" @click="saveDoc" :disable="!isValid" />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthDocStore } from 'src/stores/auth'

const docStore = useAuthDocStore()
const document = ref(docStore.authDoc)

const valDoc = [
  (val) => /^\d+$/.test(val) || 'Digite apenas números!',
  (val) => [11, 14].includes(val.length) || 'Digite um CPF ou CNPJ válido!',
]

const isValid = computed(() => {
  return valDoc.every((rule) => rule(document.value) === true)
})

const saveDoc = () => {
  docStore.setDocument(document.value)
}
</script>
