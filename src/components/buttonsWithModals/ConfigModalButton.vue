<script setup>
import { ref } from 'vue'

const visible = ref(false);
const settings = defineModel('settings', { default: { geminiApiKey: '', targetLanguage: 'English' } })
</script>

<template>
  <Button label="⚙️" @click="visible = true" />

  <Dialog v-model:visible="visible" modal header="Application Settings" :style="{ width: '50rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="gemini-api" class="font-semibold w-40">Gemini API key</label>
      <InputText id="gemini-api" v-model="settings.geminiApiKey" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="target-language" class="font-semibold w-40">Target Language</label>
      <InputText id="target-language" v-model="settings.targetLanguage" class="flex-auto" autocomplete="off" />
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Close" severity="secondary" @click="visible = false" />
    </div>
  </Dialog>
</template>
