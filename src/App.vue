<script setup>
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'
import {onMounted, ref, computed} from 'vue'
import gemini from '@/libs/gemini.js'
import dbService from '@/api/dbService.js'

const input = ref('')
const answer = ref([])
const isLoading = ref(false)

const generate = async () => {
  isLoading.value = true
  gemini.generate(input.value).then(async (word) => {
    answer.value.unshift(word) // show as gray before saving
    const response = await dbService.create(word)
    answer.value[0].Id = response.data.Id
    isLoading.value = false
    input.value = ''
  })
}

onMounted(async () => {
  answer.value = (await dbService.getAll()).data.list
})

function deleteCard(Id) {
  dbService.delete(Id)
  answer.value = answer.value.filter(item => item.Id !== Id)
}

const filteredAnswer = computed(() => {
  const term = input.value.trim().toLowerCase()
  if (!term) return answer.value
  return answer.value.filter(item =>
      (item.word || "").toLowerCase().includes(term) ||
      (item.translation || "").toLowerCase().includes(term)
  )
})
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
      .catch(err => console.error('SW registration failed:', err));
}
</script>

<template>
  <div class="container m-auto">
    <div class="fixed bottom-5 right-5 z-50 sm:sm:z-auto">
      <ConfigModalButton/>
    </div>
    <div class="mx-2 sm:mx-0">
      <form class="flex flex-col gap-3 mt-5" @submit.prevent="generate">
        <div class="flex flex-col gap-2 sm:flex-row">
          <InputText
              id="input"
              v-model="input"
              class="flex-auto"
              autocomplete="off"
              placeholder="Input new word"
          />
          <Button label="Generate" :disabled="isLoading" type="submit"/>
        </div>
      </form>
      <DataTable :value="filteredAnswer"  class="mt-5" >
        <Column header="Word">
          <template #body="slotProps">
            <span v-tooltip="slotProps.data.explanation">{{ slotProps.data.word }}</span>
          </template>
        </Column>
        <Column header="Translation">
          <template #body="slotProps">
            <span v-tooltip="slotProps.data.examples">{{ slotProps.data.translation }}</span>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button @click="deleteCard(slotProps.data.Id)" label="Delete"/>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
