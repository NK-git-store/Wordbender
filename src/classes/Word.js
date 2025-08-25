export default class Word {
  constructor({ word, translation, examples = '', explanation = '' }) {
    if (!word || !translation) {
      throw new Error('Word and translation are required')
    }
    this.word = word
    this.translation = translation
    this.examples = examples
    this.explanation = explanation
  }
  toObject() {
    return {
      word: this.word,
      translation: this.translation,
      examples: this.examples,
      explanation: this.explanation,
    }
  }
}
