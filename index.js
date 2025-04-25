import { updateSourceLangSelector, updateTargetLangSelector } from "./render.js";
import { getTranslation } from "./translate.js";
import { getAllElements } from "./utils.js";

//Init DOM Elements
const elements = getAllElements();


/**
 * @typedef { { 
* sourceLang: string,
* targetLang: string,
* sourceText: string,
* mainTranslation: string,
* currentApi: string,
* translateAutomatically: boolean,
* lastTranslationResult: import("./translate.js").TranslationResult;
* } } State
*/

/** 
 * @type {State} Global state of properties, mostly related to HTML elements 
 */
const state = {
   get sourceLang() { return this._sourceLang; },
   set sourceLang(newValue) {
    this._sourceLang = newValue;
    updateSourceLangSelector(elements.sourceLangSelector, this.currentApi, this.sourceLang);
   },

   get targetLang() { return this._targetLang; },
   set targetLang(newValue) {
    this._targetLang = newValue;
    updateTargetLangSelector(elements.targetLangSelector, this.currentApi, this.targetLang);
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

   currentApi: "google",
   translateAutomatically: elements.translateAutomaticallyCheckbox.checked,
   lastTranslationResult: { sourceText: "", mainTranslation: "", moreOptions: [] }
} // end of state object


/******************************************
/* Functions 
******************************************/

async function callApi() {
    if (!state.sourceText) {
        return;
    }
    const translationResult = await getTranslation(state.sourceLang, state.targetLang, state.sourceText, state.currentApi);

    state.mainTranslation = translationResult.mainTranslation;
    state.lastTranslationResult = translationResult;
}



/******************************************
* Event Listeners 
******************************************/

// Start translation if state.translateAutomatically is true
elements.sourceTextInput.addEventListener("input", (event) => {
    state.sourceText = event.currentTarget.value;
    if (state.translateAutomatically) {
        //state.sourceText = event.currentTarget.value; // ToDo remove
        callApi();
    }
});

// Change main translation when typing
elements.mainTranslationInput.addEventListener("input", (event) => state.mainTranslation = event.currentTarget.value);

// Start translation on click
elements.translateBtn.addEventListener("click", () => callApi());

// reset main translation input
elements.resetBtn.addEventListener("click", () => state.mainTranslation = state.lastTranslationResult.mainTranslation);

// toggle auto-translation
elements.translateAutomaticallyCheckbox.addEventListener("change", (event) => state.translateAutomatically = event.currentTarget.checked);

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



/******************************************
* Initializing default state properties
******************************************/
state.sourceLang = "auto";
state.targetLang = "en";
state.sourceText = "";
state.mainTranslation = "";