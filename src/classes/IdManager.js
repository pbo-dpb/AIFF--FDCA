// utils/IdManager.js
class IdManager {
  #counter = 0;
  static #instance = null;

  constructor() {
    if (IdManager.#instance) {
      return IdManager.#instance;
    }
    IdManager.#instance = this;
  }

  static getInstance() {
    if (!IdManager.#instance) {
      IdManager.#instance = new IdManager();
    }
    return IdManager.#instance;
  }

  generateId(prefix, text = "") {
    this.#counter++;
    const sanitizedText = text.replace(/[^a-zA-Z0-9]+/g, "");
    return `${prefix}_${this.#counter}_${sanitizedText}`;
  }

  generateRadioGroupId(legend) {
    return this.generateId("ri", legend);
  }

  generateTypeRadioId() {
    return this.generateId("typeradio");
  }

  generateInputId(label) {
    return this.generateId("i", label);
  }
}

const idManager = IdManager.getInstance();
export { idManager };
