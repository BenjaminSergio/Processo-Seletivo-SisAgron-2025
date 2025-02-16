<template>
  <q-page padding>
    <q-item-label class="text-h6">Notas Fiscais</q-item-label>

    <!-- Se não houver notas, exibe mensagem -->
    <div v-if="notas.length === 0" class="q-mt-md text-center">
      Nenhuma nota fiscal encontrada para o CPF/CNPJ informado.
    </div>

    <!-- Se houver notas, exibe a lista -->
    <q-list v-else>
      <q-item v-for="nota in notas" :key="nota.id">
        <q-item-section>
          <div><strong>Destinatário/Remetente: </strong>{{ nota.destinatarioRemetente }}</div>
          <div>
            <strong>Data de Emissão: </strong>{{ new Date(nota.dtEmissao).toLocaleDateString() }}
          </div>
          <div><strong>Valor: </strong>{{ formatCurrency(nota.valorTotal) }}</div>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- Botão para retornar à página /user -->
    <q-btn to="/home" label="Voltar" color="primary" class="q-mt-md" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthDocStore } from 'src/stores/auth'
import { db } from 'src/config/Firebase'

const docStore = useAuthDocStore()

const notas = ref([]) // Armazena as notas fiscais encontradas
const loading = ref(true) // Indicador de carregamento

// Função para buscar as notas fiscais
const fetchNotas = async () => {
  try {
    const cpfCnpj = docStore.authDoc // Obtemos o CPF/CNPJ do store
    console.log('Buscando notas fiscais para o CPF/CNPJ:', cpfCnpj)

    // Definindo a referência da coleção no Firestore
    const notasCollection = collection(db, 'notas', cpfCnpj, 'nfe')
    const querySnapshot = await getDocs(notasCollection)

    console.log('Notas encontradas:', querySnapshot.size)

    if (querySnapshot.empty) {
      console.log('Nenhuma nota fiscal encontrada para o CPF/CNPJ:', cpfCnpj)
    } else {
      // Mapeando os documentos encontrados
      notas.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    }
  } catch (error) {
    console.error('Erro ao carregar as notas fiscais:', error)
  } finally {
    loading.value = false
  }
}

// Função para formatar o valor como moeda
const formatCurrency = (value) => {
  if (value) {
    const number = parseFloat(value)
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
  }
  return 'R$ 0,00'
}

// Chama a função ao montar o componente
onMounted(() => {
  fetchNotas()
})
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
