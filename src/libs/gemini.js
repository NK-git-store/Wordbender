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

            const ai = new GoogleGenAI({apiKey: geminiApiKey.value})
            const response = await ai.models.generateContent({
                model: 'gemma-3n-e4b-it',
                contents: `
I will give you one word (which may or may not be in English).  
Your task: always return a JSON object in the following format:

{
  "word": "the base English form of the word (with 'to' if verb, 'a' if singular countable noun)",
  "examples": "example 1; example 2",
  "translation": "translation in ${nativeLanguage.value} (if multiple meanings, separate by ; )",
  "explanation": "short explanation in simple English"
}

Rules:
- Always use the corrected English base form in "word", even if the input word is misspelled or given in another language.  
- Never output non-English words in "word".  
- If the input word is not English, first find its correct English equivalent.  
- Give at least 2 simple usage examples in English, separated by ';'.  
- Keep the explanation short and in simple English.  ђ
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
