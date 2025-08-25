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
    await dbService.create(word)
    isLoading.value = false
  })
}

onMounted(async () => {
  answer.value = (await dbService.getAll()).data.list
})
</script>

<template>
  <div class="container m-auto">
    <div class="absolute bottom-5 right-5">
      <ConfigModalButton/>
    </div>
    <div>
      <form class="flex flex-col gap-3 mt-5" @submit.prevent="generate">
        <label for="input" class="font-semibold w-40">Input new word</label>
        <InputText
            id="input"
            v-model="input"
            class="flex-auto"
            autocomplete="off"
        />
        <Button label="Generate" :disabled="isLoading" type="submit"/>
      </form>

      <DataTable :value="answer" tableStyle="min-width: 50rem">
        <Column field="word" header="Word"></Column>
        <Column field="translation" header="Translation"></Column>
        <Column field="examples" header="Examples"></Column>
        <Column field="explanation" header="Explanation"></Column>
<!--        Delete Button-->
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
