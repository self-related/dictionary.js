import { updateSourceLangSelector, updateTargetLangSelector } from "./render.js";
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
const mainTranslationInput = document.getElementById("main-translation");


    /**@type {?HTMLButtonElement} #translate-btn */
const translateBtn = document.getElementById("translate-btn");

    /**@type {?HTMLButtonElement} #reset-btn */
const resetBtn = document.getElementById("reset-btn");

    /**@type {?HTMLButtonElement} #add-btn */
const addBtn = document.getElementById("add-btn");

    /**@type {?HTMLInputElement} #auto-translate */
const translateAutomaticallyCheckbox = document.getElementById("translate-automatically");



/* Global variables *****************************************************************/

    /**@type {String} */
let sourceLang = "auto";

    /**@type {String} */
let targetLang = "en";

    /**@type {boolean} */
let translateAutomatically = translateAutomaticallyCheckbox.checked;

    /**@type {String} */
let sourceText = "";

    /**@type {String} */
let mainTranslation = "";

    /**@type {String} */
let api = "google";

    /**@type {import("./translate.js").TranslationResult} */
let lastTranslationResult = { sourceText: "", mainTranslation: "", moreOptions: [] };


/* Functions ***************************************************************************/

function updateMainTranslationInput() {
    mainTranslationInput.value = mainTranslation;
}

async function callApi() {
    if (!sourceText) {
        return;
    }
    const translationResult = await getTranslation(sourceLang, targetLang, sourceText, api);
    console.log(translationResult); // temp

    mainTranslation = translationResult.mainTranslation;
    updateMainTranslationInput();
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
mainTranslationInput.addEventListener("input", (event) => mainTranslation = event.currentTarget.value);

// Start translation on click
translateBtn.addEventListener("click", () => {
    sourceText = sourceTextInput.value;
    callApi();
});

// reset main translation input
resetBtn.addEventListener("click", () => {
    mainTranslation = lastTranslationResult.mainTranslation;
    updateMainTranslationInput();
})

// toggle auto-translation
translateAutomaticallyCheckbox.addEventListener("change", (event) => {
    translateAutomatically = event.currentTarget.checked;
    console.log(translateAutomatically);
});

// change source lang on selector value change
sourceLangSelector.addEventListener("change", (event) => {
    sourceLang = event.currentTarget.value;
});

// change target lang on selector value change
targetLangSelector.addEventListener("change", (event) => {
    targetLang = event.currentTarget.value;
});

switchLangsBtn.addEventListener("click", () => {
    if (sourceLang === "auto") {
        return;
    }
    [sourceLang, targetLang] = [targetLang, sourceLang];
    [sourceText, mainTranslation] = [mainTranslation, sourceText];

    // manual DOM update
    sourceLangSelector.value = sourceLang;
    targetLangSelector.value = targetLang;
    sourceTextInput.value = sourceText;
    mainTranslationInput.value = mainTranslation;
});



/* Update elements on page load *******************************************************************/

// ToDo: replace by Render
updateSourceLangSelector(sourceLangSelector, api, sourceLang);
updateTargetLangSelector(targetLangSelector, api, targetLang);

// ToDo: replace by Render
sourceTextInput.value = sourceText;
mainTranslationInput.value = mainTranslation;