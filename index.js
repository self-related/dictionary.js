/**
 * @typedef {import("./api.js").Translation} Translation
 * 
 * @typedef {Object.<string, Translation[]>} DictionaryMap
 * 
 * @typedef { { 
 *  sourceLang: string,
 *  targetLang: string,
 *  sourceText: string,
 *  mainTranslation: string,
 *  currentApi: string,
 *  translateAutomatically: boolean,
 *  translation: Translation,
 *  dictionaryMap: DictionaryMap
 * } } State
 * 
 */



import { api } from "./api.js";
import { renderMoreOptionsEntries, renderSourceLangSelector, renderTargetLangSelector } from "./render.js";
import { getAllElements } from "./utils.js";

//Init DOM Elements
const elements = getAllElements();



/** 
 * @type {State} Global state of properties, mostly related to HTML elements 
 */
const state = {
    currentApi: "google",

    get sourceLang() { return this._sourceLang; },
    set sourceLang(newValue) {
        this._sourceLang = newValue;
        renderSourceLangSelector(elements.sourceLangSelector, this.sourceLang, api[this.currentApi].langs);
    },

    get targetLang() { return this._targetLang; },
    set targetLang(newValue) {
        this._targetLang = newValue;
        renderTargetLangSelector(elements.targetLangSelector, this.targetLang, api[this.currentApi].langs);
    },

    get sourceText() { return this._sourceText },
    set sourceText(newValue) {
        this._sourceText = newValue;
        elements.sourceTextInput.value = newValue;
    },

    get mainTranslation() { return this._mainTranslation }, 
    set mainTranslation(newValue) {
        this._mainTranslation = newValue;
        elements.mainTranslationInput.value = newValue;
    },

    get translateAutomatically() { return this._translateAutomatically; },
    set translateAutomatically(newValue) {
        this._translateAutomatically = newValue;
        elements.translateAutomaticallyCheckbox.checked = newValue;
    },

    translation: { detectedSourceLang: "", sourceLang: "", sourceText: "", mainTranslation: "", otherTranslations: [] },

    dictionaryMap: {},
} // end of state object


/******************************************
/* Functions 
******************************************/

async function callApi() {
    if (!state.sourceText) {
        return;
    }
    const translation = await api[state.currentApi].getTranslation(state); // just put state bc prop names are the same

    state.mainTranslation = translation.mainTranslation;
    state.translation = translation;
    renderMoreOptionsEntries(state);
}



/******************************************
* Event Listeners 
******************************************/

// Start translation if state.translateAutomatically is true
elements.sourceTextInput.addEventListener("input", (event) => {
    state.sourceText = event.currentTarget.value;
    if (state.translateAutomatically) {
        callApi();
    }
});

// Change main translation when typing
elements.mainTranslationInput.addEventListener("input", (event) => state.mainTranslation = event.currentTarget.value);

// Start translation on click
elements.translateBtn.addEventListener("click", () => callApi());

// reset main translation input
elements.resetBtn.addEventListener("click", () => state.mainTranslation = state.translation.mainTranslation);

// toggle auto-translation
elements.translateAutomaticallyCheckbox.addEventListener("change", (event) => {
    state.translateAutomatically = event.currentTarget.checked;
    if (state.translateAutomatically) callApi();
});

// change source lang on selector value change
elements.sourceLangSelector.addEventListener("change", (event) => state.sourceLang = event.currentTarget.value);

// change target lang on selector value change
elements.targetLangSelector.addEventListener("change", (event) => state.targetLang = event.currentTarget.value);

elements.switchLangsBtn.addEventListener("click", () => {
    if (state.sourceLang === "auto") {
        return;
    }
    [state.sourceLang, state.targetLang] = [state.targetLang, state.sourceLang];
    [state.sourceText, state.mainTranslation] = [state.mainTranslation, state.sourceText];
});

elements.addBtn.addEventListener("click", () => {
    // don't add if there's no lang detected on auto-detection
    if (state.sourceLang == "auto" && !state.translation.detectedSourceLang) {
        return;
    }

    // don't add empty strings and spaces
    if (!state.sourceText?.trim() || !state.mainTranslation?.trim()) {
        return;
    }
    
    const sourceLang = state.sourceLang == "auto" ? state.translation.detectedSourceLang : state.sourceLang;
    const dictionaryName = `${api[state.currentApi].langs[sourceLang]} - ${api[state.currentApi].langs[state.targetLang]}`;

    if (!state.dictionaryMap[dictionaryName]) {
        state.dictionaryMap[dictionaryName] = [];
    } 

    const existingItemIndex = state.dictionaryMap[dictionaryName].findIndex((translation) => translation.sourceText == state.sourceText.trim());
    const newTranslation = {...state.translation, sourceLang: state.sourceLang, mainTranslation: state.mainTranslation, sourceText: state.sourceText.trim()};

    if (existingItemIndex < 0) {
        state.dictionaryMap[dictionaryName].push(newTranslation);
    } else if (window.confirm("Replace existing translation?")) {
        state.dictionaryMap[dictionaryName][existingItemIndex] = newTranslation;
    }
    
    console.log(state.dictionaryMap);

});


/******************************************
* Initializing default state properties
******************************************/
state.sourceLang = "auto";
state.targetLang = "es";
state.sourceText = "long";
state.mainTranslation = ""; callApi(); // for tests only
state.translateAutomatically = true;

