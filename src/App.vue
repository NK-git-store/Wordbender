<script setup>
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'
import { useSettingsStore } from '@/stores/settings.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { GoogleGenAI } from '@google/genai'

const settingsStore = useSettingsStore()
const { geminiApiKey, nativeLanguage } = storeToRefs(settingsStore)

const input = ref('')
const answer = ref('')
const isLoading = ref(false)

const generate = async () => {
  console.log(11)
  if (!geminiApiKey.value) {
    alert('Please set your Gemini API key in the settings.')
    return
  }
  if (!input.value) {
    alert('Please enter a word to translate.')
    return
  }
  isLoading.value = true

  const ai = new GoogleGenAI({apiKey: geminiApiKey.value});
  const response = await ai.models.generateContent({
    model: 'gemma-3n-e4b-it',
    contents: `Translate the following word to ${nativeLanguage.value}: ${input.value}; Respond in format "Original word - Translation"`,
  });
  answer.value = response.text;
  isLoading.value = false
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

      <p class="mt-5">{{answer}}</p>
    </div>
  </div>
</template>

<style scoped></style>
