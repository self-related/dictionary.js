/**
 * @template T
 * @typedef Updatable
 * @prop {function(T): void} update
 */

/**
 * @template T
 * @typedef {T & Updatable<T>} UpdatableElement
 */
 
/**
 * @template T
 * @param {T} attributes 
 */
function update(attributes) {
    for (const attr in attributes) {
        this[attr] = attributes[attr];
    }
}

export function getAllElements() {
        /**@type {?UpdatableElement<HTMLSelectElement>} #current-lang */
    const sourceLangSelector = document.getElementById("source-lang");

        /**@type {?UpdatableElement<HTMLButtonElement>} #switch-langs-btn */
    const switchLangsBtn = document.getElementById("switch-langs-btn");

        /**@type {?UpdatableElement<HTMLSelectElement>} #target-lang */
    const targetLangSelector = document.getElementById("target-lang");


        /**@type {?UpdatableElement<HTMLInputElement>} #source-text */
    const sourceTextInput = document.getElementById("source-text");

        /**@type {?UpdatableElement<HTMLInputElement>} #main-translation */
    const mainTranslationInput = document.getElementById("main-translation");


        /**@type {?UpdatableElement<HTMLButtonElement>} #translate-btn */
    const translateBtn = document.getElementById("translate-btn");

        /**@type {?UpdatableElement<HTMLButtonElement>} #reset-btn */
    const resetBtn = document.getElementById("reset-btn");

        /**@type {?UpdatableElement<HTMLButtonElement>} #add-btn */
    const addBtn = document.getElementById("add-btn");

        /**@type {?UpdatableElement<HTMLInputElement>} #translate-automatically */
    const translateAutomaticallyCheckbox = document.getElementById("translate-automatically");

    const elements = {
        sourceLangSelector,
        switchLangsBtn,
        targetLangSelector,
        sourceTextInput,
        mainTranslationInput,
        translateBtn,
        resetBtn,
        addBtn,
        translateAutomaticallyCheckbox,
    };

    for (const element in elements) {
        /**
         * @member {String} update
         */
        elements[element].update = update;
    }

    return elements;
}