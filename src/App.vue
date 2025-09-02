<script setup>
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'
import { onMounted, ref, computed } from 'vue'
import gemini from '@/libs/gemini.js'
import dbService from '@/api/dbService.js'

const input = ref('')
const answer = ref([])
const isLoading = ref(false)

// ContextMenu
const cm = ref(null)
const selected = ref(null)
const menuItems = ref([
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    command: () => {
      if (selected.value) deleteCard(selected.value.Id)
    }
  }
])

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

function onRightClick(e, word) {
  e.preventDefault()
  selected.value = word
  cm.value?.show(e)
}

const filteredAnswer = computed(() => {
  const term = input.value.trim().toLowerCase()
  if (!term) return answer.value
  return answer.value.filter(item =>
    (item.word || '').toLowerCase().includes(term) ||
    (item.translation || '').toLowerCase().includes(term)
  )
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .catch(err => console.error('SW registration failed:', err))
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
      <ul class="mt-5">
        <li
          v-for="word in filteredAnswer"
          :key="word.Id"
          class="my-4"
          @contextmenu.prevent="onRightClick($event, word)"
        >
          <span class="font-bold" v-tooltip="word.explanation">{{ word.word }}</span>
          -
          <span v-tooltip="word.examples.replace(' / ', '\n\n' )">{{ word.translation }}</span>
        </li>
      </ul>

      <ContextMenu ref="cm" :model="menuItems" />

      <ContextMenu  ref="cm" :model="menuItems"/>
    </div>
  </div>
</template>

<style scoped></style>
