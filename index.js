import { updateSourceLangSelector, updateTargetLangSelector } from "./render.js";
import { getTranslation } from "./translate.js";
import { getAllElements } from "./utils.js";

/* Init DOM Elements ******************************************************************/
const elements = getAllElements();


/* Global state of properties, mostly related to HTML elements ************************/

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
*
* @type {State} state variable
*/
const state = {
   sourceLang: "auto",
   targetLang: "en",
   sourceText: "",

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
   lastTranslationResult: { sourceText: "", mainTranslation: "", moreOptions: [] }, // temp??
}


/* Functions ***************************************************************************/

function updateMainTranslationInput() {
    elements.mainTranslationInput.value = state.mainTranslation; //ToDo remove
}

async function callApi() {
    if (!state.sourceText) {
        return;
    }
    const translationResult = await getTranslation(state.sourceLang, state.targetLang, state.sourceText, state.currentApi);
    console.log(translationResult); // temp

    state.mainTranslation = translationResult.mainTranslation;
    updateMainTranslationInput(); //ToDo remove
    state.lastTranslationResult = translationResult;
}



/* Event Listeners *******************************************************************/

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
elements.translateBtn.addEventListener("click", () => {
    state.sourceText = elements.sourceTextInput.value; // ToDo remove
    callApi();
});

// reset main translation input
elements.resetBtn.addEventListener("click", () => {
    state.mainTranslation = state.lastTranslationResult.mainTranslation;
    updateMainTranslationInput(); //ToDo remove
})

// toggle auto-translation
elements.translateAutomaticallyCheckbox.addEventListener("change", (event) => {
    state.translateAutomatically = event.currentTarget.checked;
    console.log(state.translateAutomatically);
});

// change source lang on selector value change
elements.sourceLangSelector.addEventListener("change", (event) => {
    state.sourceLang = event.currentTarget.value;
});

// change target lang on selector value change
elements.targetLangSelector.addEventListener("change", (event) => {
    state.targetLang = event.currentTarget.value;
});

elements.switchLangsBtn.addEventListener("click", () => {
    if (state.sourceLang === "auto") {
        return;
    }
    [state.sourceLang, state.targetLang] = [state.targetLang, state.sourceLang];
    [state.sourceText, state.mainTranslation] = [state.mainTranslation, state.sourceText];

    // manual DOM update
    elements.sourceLangSelector.value = state.sourceLang;
    elements.targetLangSelector.value = state.targetLang;
    elements.sourceTextInput.value = state.sourceText;
    elements.mainTranslationInput.value = state.mainTranslation;
});



/* Update elements on page load *******************************************************************/

// ToDo: remove
updateSourceLangSelector(elements.sourceLangSelector, state.currentApi, state.sourceLang);
updateTargetLangSelector(elements.targetLangSelector, state.currentApi, state.targetLang);


state.sourceText = "test";