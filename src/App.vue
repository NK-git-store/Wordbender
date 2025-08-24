<script setup>
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'
import { ref } from 'vue'
import gemini from '@/libs/gemini.js'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings.js'

const settingsStore = useSettingsStore()
const { geminiApiKey, nativeLanguage } = storeToRefs(settingsStore)

const input = ref('')
const answer = ref([])
const isLoading = ref(false)

const generate = async () => {
  isLoading.value = true
  gemini.generate(geminiApiKey.value, nativeLanguage.value, input.value).then((res) => {
    answer.value.push(res)
  }).finally((err) => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="container m-auto">
    <div class="absolute bottom-5 right-5">
      <ConfigModalButton />
    </div>
    <div>
      <div class="flex flex-col gap-3 mt-5">
        <label for="input" class="font-semibold w-40">Input new word</label>
        <InputText id="input" v-model="input" class="flex-auto" autocomplete="off" />
        <Button label="Generate" :disabled="isLoading" @click="generate"/>
      </div>

      <ul class="mt-5 flex flex-col-reverse gap-1">
        <li v-for="el in answer">{{el}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
