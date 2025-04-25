/**
 * @template T
 * @typedef Updatable
 * @prop {function(T): void} update
 */

import { getTranslation } from "./translate.js";

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




// a class to set state variables and sync them with DOM
export class Control {

    /**********************
    * define all existing properties   
    ***********************/

    /** @type {Document} HTML Document */
    document = {};

    /** 
    * @typedef {import("./index.js").State} State
    */

    /** @type {State} State of the app */
    state = {};

    // !!! elements = {}; // see constructor

    /**********************
    * getters   
    ***********************/

    get googleApiUrl() {
        return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.state.sourceLang}&tl=${this.state.targetLang}&dt=t&dt=bd&dj=1&q=${this.state.sourceText}`;
    }



    /**********************
    * class methods   
    ***********************/
    getAllElements(document) {
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


        this.elements = {
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

        /**
         * @template T 
         * @param {T} attributes 
         * */
        function update(attributes) {
            for (const attr in attributes) {
                this[attr] = attributes[attr];
            }
        }

        for (const element in this.elements) {
                /**
                 * @member {String} update
                 */
            this.elements[element].update = update;
        }

        //this.elements = elements;

    } // end of getAllElements()



    // get unified object of translation data with google api 
    async translateWithGoogleApi() {
        console.log(this.state)
        const json = await fetch(this.googleApiUrl).then(data => data.json());
        return {
            sourceText: json.sentences[0].orig,
            mainTranslation: json.sentences[0].trans,
            otherTranslations: json.dict?.map(dict => ({
                pos: dict.pos,
                translations: dict.terms 
            }))
        };
    }


    // get unified object of translation data, update state, update DOM
    async translate() {
        /**
         * @type ToDo
         * unified object of translation data
         */
        let translation = {};
        switch (this.state.currentApi) {
            case "google":
                translation = await this.translateWithGoogleApi();
                console.log(translation);
                break;
        }

        this.state = {...this.state, translation};

        this.elements.mainTranslationInput.update({value: this.state.mainTranslation});
    }
    
    
    constructor(state, document) {
        this.state = state;
        this.document = document;
        this.getAllElements(document);
    }
}