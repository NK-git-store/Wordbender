// stores/settings.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const geminiApiKey = ref('')
  const targetLanguage = ref('English')
  const KEY = 'app:settings'

  // загрузка при инициализации
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      geminiApiKey.value = parsed.geminiApiKey ?? ''
      targetLanguage.value = parsed.targetLanguage ?? 'English'
    }
  } catch {}

  // авто-сохранение
  watch([geminiApiKey, targetLanguage], () => {
    localStorage.setItem(KEY, JSON.stringify({
      geminiApiKey: geminiApiKey.value,
      targetLanguage: targetLanguage.value
    }))
  }, { deep: true })

  return { geminiApiKey, targetLanguage }
})
