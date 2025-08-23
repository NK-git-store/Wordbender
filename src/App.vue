<script setup>
import { onMounted, reactive, watch } from 'vue'
import ConfigModalButton from '@/components/buttonsWithModals/ConfigModalButton.vue'

const settings = reactive({ geminiApiKey: '', targetLanguage: 'English' })

onMounted(() => {
  const savedSettings = localStorage['settings'];
  if (savedSettings) {
    Object.assign(settings, JSON.parse(savedSettings))
  }
})

watch(settings, (newSettings) => {
  localStorage['settings'] = JSON.stringify(newSettings)
}, { deep: true })
</script>

<template>
  <div class="absolute top-5 right-5">
    <ConfigModalButton v-model:settings="settings" />
  </div>
</template>

<style scoped></style>
