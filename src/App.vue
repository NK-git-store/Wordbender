<script setup>
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'
import { useSettingsStore } from '@/stores/settings.js'
import { storeToRefs } from 'pinia'

const settingsStore = useSettingsStore()
const { geminiApiKey, targetLanguage } = storeToRefs(settingsStore)
</script>

<template>
  <div class="absolute top-5 right-5">
    <ConfigModalButton />
  </div>
  <div>
    {{geminiApiKey}} ; {{targetLanguage}}
  </div>
</template>

<style scoped></style>
