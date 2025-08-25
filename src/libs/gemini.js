import { GoogleGenAI } from '@google/genai'
import { pinia } from '@/pinia'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { Word } from '@/objects/Word.js'

export default {
  generate: (text) => {
    const settings = useSettingsStore(pinia)
    const { geminiApiKey, nativeLanguage } = storeToRefs(settings)

    return new Promise(async (resolve, reject) => {
      if (!geminiApiKey.value) {
        alert('Please set your Gemini API key in the settings.')
        return reject()
      }
      if (!text) {
        alert('Please enter a word to translate.')
        return reject()
      }

      const ai = new GoogleGenAI({ apiKey: geminiApiKey.value })
      const response = await ai.models.generateContent({
        model: 'gemma-3n-e4b-it',
        contents: `
      I will give you one English word. Return a JSON object.
      Format of object:
      {
        "word": "the base form of the word with 'to' or 'a' if needed",
        "examples": "example 1; example 2; (if multiple examples, separate by ; )",
        "translation": "translation in ${nativeLanguage.value} (if multiple meanings, separate by ; )",
        "explanation": "short explanation in simple English"
      }
      If you think a word contains a mistake, use the corrected version of the word in Word.
      Input word: ${text}
    `,
      })
      const answer = response.text.replace('```json', '').replace('```', '').trim();
      const parsed = JSON.parse(answer)

      const word = {
        ...Word,
        word: parsed.word,
        translation: parsed.translation,
        examples: parsed?.examples ?? '',
        explanation: parsed?.explanation ?? ''
      }
      resolve(word)
    })
  },
}
