<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

const visible = ref(false);

const settingsStore = useSettingsStore()
const { geminiApiKey, targetLanguage } = storeToRefs(settingsStore)
</script>

<template>
  <Button label="⚙️" @click="visible = true" />

  <Dialog v-model:visible="visible" modal header="Application Settings" :style="{ width: '50rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="gemini-api" class="font-semibold w-40">Gemini API key</label>
      <InputText id="gemini-api" v-model="geminiApiKey" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="target-language" class="font-semibold w-40">Target Language</label>
      <InputText id="target-language" v-model="targetLanguage" class="flex-auto" autocomplete="off" />
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Close" severity="secondary" @click="visible = false" />
    </div>
  </Dialog>
</template>
