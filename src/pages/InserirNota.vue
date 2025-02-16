<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md shadow-2">
      <q-card-section>
        <div class="text-h6">Nova Nota Fiscal</div>
      </q-card-section>

      <q-form @submit="salvarNota">
        <q-card-section>
          <q-input v-model="nota.destinatarioRemetente" label="Destinatário/Remetente" outlined />
          <q-input v-model="nota.emisor" label="Emissor" outlined />
          <q-input v-model="nota.chaveAcesso" label="Chave de Acesso" outlined />
          <q-input v-model="nota.noNfe" label="Número da NF-e" type="number" outlined />
          <q-input v-model="nota.serieNfe" label="Série NF-e" type="number" outlined />
          <q-input
            v-model="nota.valorTotal"
            label="Valor Total"
            type="number"
            step="0.01"
            outlined
          />
          <q-select v-model="nota.tipo" :options="['Despesa', 'Receita']" label="Tipo" outlined />
          <q-input v-model="nota.dtEmissao" type="date" label="Data de Emissão" outlined />
          <q-input
            v-model="nota.dtEntradaSaida"
            type="date"
            label="Data de Entrada/Saída"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn type="submit" label="Salvar" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthDocStore } from 'src/stores/auth'
import { db } from 'src/config/Firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authDocStore = useAuthDocStore()
const documento = authDocStore.authDoc // Pega CPF/CNPJ do usuário no Pinia

// Estrutura inicial da nota fiscal
const nota = ref({
  anexos: [],
  arquivoEspelho: '',
  chaveAcesso: '',
  destinatarioRemetente: '',
  dtEmissao: '',
  dtEntradaSaida: '',
  emisor: '',
  malote: new Date().toISOString(),
  noNfe: '',
  serieNfe: '',
  tags: [],
  tipo: 'Despesa',
  valorTotal: '',
})

const salvarNota = async () => {
  if (!documento) {
    alert('Nenhum CPF/CNPJ encontrado. Faça login novamente.')
    return
  }

  try {
    // Remove campos vazios antes de salvar
    const notaValida = Object.fromEntries(Object.entries(nota.value).filter(([, v]) => v !== ''))

    // Criar referência ao documento
    const notaRef = doc(collection(db, `notas/${documento}/nfe`))

    // Converter datas corretamente, se existirem
    if (notaValida.dtEmissao) {
      notaValida.dtEmissao = new Date(notaValida.dtEmissao).toISOString()
    }
    if (notaValida.dtEntradaSaida) {
      notaValida.dtEntradaSaida = new Date(notaValida.dtEntradaSaida).toISOString()
    }

    // Salvar no Firebase
    await setDoc(notaRef, notaValida)

    // **Confirmar que a nota foi salva**
    const notaSalva = await getDoc(notaRef)
    if (notaSalva.exists()) {
      console.log('Nota salva com sucesso!', notaSalva.data())
      alert('Nota Fiscal salva com sucesso!')
    } else {
      console.error('Erro: Nota não encontrada após o salvamento.')
      alert('Erro ao salvar a nota.')
    }

    router.push('/home') // Redireciona para a HomePage
  } catch (error) {
    console.error('Erro ao salvar a nota:', error)
    alert('Erro ao salvar a nota.')
  }
}
</script>
