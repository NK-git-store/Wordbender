// stores/settings.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const geminiApiKey = ref('')
  const nativeLanguage = ref('English')
  const KEY = 'app:settings'

  // load from localStorage
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      geminiApiKey.value = parsed.geminiApiKey ?? ''
      nativeLanguage.value = parsed.nativeLanguage ?? 'English'
    }
  } catch {}

  // auto-save to localStorage
  watch([geminiApiKey, nativeLanguage], () => {
    localStorage.setItem(KEY, JSON.stringify({
      geminiApiKey: geminiApiKey.value,
      nativeLanguage: nativeLanguage.value
    }))
  }, { deep: true })

  return { geminiApiKey, nativeLanguage }
})
