import {GoogleGenAI} from '@google/genai'
import {pinia} from '@/pinia'
import {useSettingsStore} from '@/stores/settings'
import {storeToRefs} from 'pinia'
import {Word} from '@/objects/Word.js'

export default {
    generate: (text) => {
        const settings = useSettingsStore(pinia)
        const {geminiApiKey, nativeLanguage} = storeToRefs(settings)

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
        model: 'gemini-2.5-flash-lite',
        contents: `
      I will give you an English word or phrase. Return a JSON object wish translation.
      Format of object:
      {
        "word": "the base form of the word/phrase with 'to' or 'a' if needed",
        "examples": "example 1 / example 2 (if multiple examples, separate by ' / ' )",
        "translation": "translations in ${nativeLanguage.value} (if multiple meanings, separate by / )",
        "explanation": "short explanation in simple English"
      }
      If this word doesn't exist it could be a mistake, and you have to fix it.
      If the input word is highly offensive and you cannot process it directly,
      return the same JSON but replace the word with a softened form (e.g. "c**t")
      and still provide the translation and explanation in a neutral, educational way.
      Only return the JSON object, without any additional text.
      
      Here is the word:
      Input word: ${text}
    `,
        config: {
          temperature: 0.3,
        },
      })
      console.log(response)
      const answer = response.text.replace('```json', '').
        replace('```', '').
        trim()
      console.log(answer)
      const parsed = JSON.parse(answer)

      const word = {
        ...Word,
        word: parsed.word,
        translation: parsed.translation,
        examples: parsed?.examples ?? '',
        explanation: parsed?.explanation ?? '',
      }
      resolve(word)
    })
  },
}
