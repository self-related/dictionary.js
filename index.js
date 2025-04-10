import { getTranslation } from "./translate.js";

/* Init DOM Elements ******************************************************************/

    /**@type {?HTMLSelectElement} #current-lang */
const sourceLangSelector = document.getElementById("source-lang");

    /**@type {?HTMLButtonElement} #switch-langs-btn */
const switchLangsBtn = document.getElementById("switch-langs-btn");

    /**@type {?HTMLSelectElement} #target-lang */
const targetLangSelector = document.getElementById("target-lang");


    /**@type {?HTMLInputElement} #source-text */
const sourceTextInput = document.getElementById("source-text");

    /**@type {?HTMLInputElement} #translated-text */
const translatedTextInput = document.getElementById("translated-text");


    /**@type {?HTMLButtonElement} #translate-btn */
const translateBtn = document.getElementById("translate-btn");

    /**@type {?HTMLButtonElement} #reset-btn */
const resetBtn = document.getElementById("reset-btn");

    /**@type {?HTMLButtonElement} #add-btn */
const addBtn = document.getElementById("add-btn");

    /**@type {?HTMLInputElement} #auto-translate */
const autoTranslateCheckbox = document.getElementById("auto-translate");



/* Global variables *****************************************************************/

    /**@type {String} */
let sourceLang = "auto";

    /**@type {String} */
let targetLang = "en";

    /**@type {boolean} */
let translateAutomatically = false;

    /**@type {String} */
let sourceText = "";

    /**@type {String} */
let mainTranslation = "";

    /**@type {String} */
let api = "google";

    /**@type {import("./translate.js").TranslationResult} */
let lastTranslationResult = { sourceText: "", mainTranslation: "", moreOptions: [] };


/* Functions ***************************************************************************/

function updateTranslatedTextInput() {
    translatedTextInput.value = mainTranslation;
}

async function callApi() {
    if (!sourceText) {
        return;
    }
    const translationResult = await getTranslation(sourceLang, targetLang, sourceText, api);
    console.log(translationResult); // temp

    mainTranslation = translationResult.mainTranslation;
    updateTranslatedTextInput();
    lastTranslationResult = translationResult;
}



/* Event Listeners *******************************************************************/

// Start translation if translateAutomatically is true
sourceTextInput.addEventListener("input", (event) => {
    if (translateAutomatically) {
        sourceText = event.currentTarget.value;
        callApi();
    }
});

// Change main translation when typing
translatedTextInput.addEventListener("input", (event) => mainTranslation = event.currentTarget.value);

// Start translation on click
translateBtn.addEventListener("click", () => {
    sourceText = sourceTextInput.value;
    callApi();
});

resetBtn.addEventListener("click", () => {
    mainTranslation = lastTranslationResult.mainTranslation;
    updateTranslatedTextInput();
})

autoTranslateCheckbox.addEventListener("change", (event) => {
    translateAutomatically = event.currentTarget.checked;
    console.log(translateAutomatically);
});