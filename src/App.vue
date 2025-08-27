<script setup>
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'
import {onMounted, ref, computed} from 'vue'
import gemini from '@/libs/gemini.js'
import dbService from '@/api/dbService.js'

const input = ref('')
const answer = ref([])
const isLoading = ref(false)

const searchWord = ref('')

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
  const term = searchWord.value.trim().toLowerCase()
  if (!term) return answer.value
  return answer.value.filter(item =>
      (item.word || "").toLowerCase().includes(term) ||
      (item.translation || "").toLowerCase().includes(term)
  )
})

</script>

<template>
  <div class="container m-auto">
    <div class="fixed bottom-5 right-5">
      <ConfigModalButton/>
    </div>
    <div>
      <form class="flex flex-col gap-3 mt-5" @submit.prevent="generate">
        <div class="flex gap-2">
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
      <div class="flex justify-end mt-4">
        <InputText v-model="searchWord" placeholder="Keyword Search"/>
      </div>
      <DataTable :value="filteredAnswer" tableStyle="min-width: 50rem" class="mt-5">
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
