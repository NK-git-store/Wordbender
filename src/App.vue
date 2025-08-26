<script setup>
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'
import { onMounted, ref } from 'vue'
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
  })
}

onMounted(async () => {
  answer.value = (await dbService.getAll()).data.list
})
function deleteCard (Id){
  dbService.delete(Id)
}
</script>

<template>
  <div class="container m-auto">
    <div class="absolute bottom-5 right-5">
      <ConfigModalButton/>
    </div>
    <div>
      <form class="flex flex-col gap-3 mt-5" @submit.prevent="generate">
        <label for="input" class="font-semibold w-40">Input new word</label>
        <div class="flex gap-2">
          <InputText
              id="input"
              v-model="input"
              class="flex-auto"
              autocomplete="off"
          />
          <Button label="Generate" :disabled="isLoading" type="submit"/>
        </div>
      </form>

      <DataTable :value="answer" tableStyle="min-width: 50rem" class="mt-5" >
        <Column field="word" header="Word"></Column>
        <Column field="translation" header="Translation"></Column>
        <Column field="examples" header="Examples"></Column>
        <Column field="explanation" header="Explanation"></Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button  @click="deleteCard(slotProps.data.Id)" label="Delete"/>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
