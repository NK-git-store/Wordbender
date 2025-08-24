import { GoogleGenAI } from '@google/genai'

export default {
  generate: (geminiApiKey, nativeLanguage = 'English', text) => {
    console.log(geminiApiKey, nativeLanguage, text)
    return new Promise(async (resolve, reject) => {
      if (!geminiApiKey) {
        alert('Please set your Gemini API key in the settings.')
        return reject()
      }
      if (!text) {
        alert('Please enter a word to translate.')
        return reject()
      }

      const ai = new GoogleGenAI({ apiKey: geminiApiKey })
      const response = await ai.models.generateContent({
        model: 'gemma-3n-e4b-it',
        contents: `
      I will give you one English word. Return a JSON object.
      Format of object:
      {
        "word": "the base form of the word with 'to' or 'a' if needed",
        "examples": "example 1; example 2; (if multiple examples, separate by ; )",
        "translation": "translation in ${nativeLanguage} (if multiple meanings, separate by ; )",
        "explanation": "short explanation in simple English"
      }
      If you think a word contains a mistake, use the corrected version of the word in Word.
      Input word: ${text}
    `,
      })

      return resolve(response.text.replace('```json', '').replace('```', '').trim())
    })
  },
}
