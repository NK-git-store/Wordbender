<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

const visible = ref(false);

const settingsStore = useSettingsStore()
const { geminiApiKey, nativeLanguage, dbApiKey } = storeToRefs(settingsStore)
</script>

<template>
  <Button label="⚙️" @click="visible = true" />

  <Dialog v-model:visible="visible" modal header="Application Settings" :style="{ width: '50rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="gemini-api" class="font-semibold w-40">Gemini API key</label>
      <InputText id="gemini-api" v-model="geminiApiKey" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="db-api" class="font-semibold w-40">DB API key</label>
      <InputText id="db-api" v-model="dbApiKey" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="target-language" class="font-semibold w-40">Native Language</label>
      <InputText id="target-language" v-model="nativeLanguage" class="flex-auto" autocomplete="off" />
    </div>

    <div class="flex justify-end gap-2">
      <Button label="OK" severity="success" @click="visible = false" />
    </div>
  </Dialog>
</template>
