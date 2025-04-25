import { updateSourceLangSelector, updateTargetLangSelector } from "./render.js";
import { getTranslation } from "./translate.js";
import { Control, getAllElements } from "./utils.js";

/* Init DOM Elements ******************************************************************/
const elements = getAllElements();


/* Global variables *****************************************************************/

/**
 * @typedef { { 
 * sourceLang: string,
 * targetLang: string,
 * sourceText: string,
 * mainTranslation: string,
 * currentApi: string,
 * translateAutomatically: boolean
 * } } State
 *
 * @type {State} 
 */
const state = {
    sourceLang: "auto",
    targetLang: "en",
    sourceText: "",
    mainTranslation: "",
    currentApi: "google",
    translateAutomatically: elements.translateAutomaticallyCheckbox.checked,
    lastTranslationResult: { sourceText: "", mainTranslation: "", moreOptions: [] }, // temp??
}

    /**@type {String} */
let sourceLang = "auto";

    /**@type {String} */
let targetLang = "en";

    /**@type {boolean} */
let translateAutomatically = elements.translateAutomaticallyCheckbox.checked;

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
    elements.mainTranslationInput.value = mainTranslation;
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
elements.sourceTextInput.addEventListener("input", (event) => {
    if (translateAutomatically) {
        sourceText = event.currentTarget.value;
        callApi();
    }
});

// Change main translation when typing
elements.mainTranslationInput.addEventListener("input", (event) => mainTranslation = event.currentTarget.value);

// Start translation on click
elements.translateBtn.addEventListener("click", () => {
    sourceText = elements.sourceTextInput.value;
    callApi();
});

// reset main translation input
elements.resetBtn.addEventListener("click", () => {
    mainTranslation = lastTranslationResult.mainTranslation;
    updateMainTranslationInput();
})

// toggle auto-translation
elements.translateAutomaticallyCheckbox.addEventListener("change", (event) => {
    translateAutomatically = event.currentTarget.checked;
    console.log(translateAutomatically);
    if (event.target.checked == true) {
        callApi();
    }
});

// change source lang on selector value change
elements.sourceLangSelector.addEventListener("change", (event) => {
    sourceLang = event.currentTarget.value;
});

// change target lang on selector value change
elements.targetLangSelector.addEventListener("change", (event) => {
    targetLang = event.currentTarget.value;
});

elements.switchLangsBtn.addEventListener("click", () => {
    if (sourceLang === "auto") {
        return;
    }
    [sourceLang, targetLang] = [targetLang, sourceLang];
    [sourceText, mainTranslation] = [mainTranslation, sourceText];

    // manual DOM update
    elements.sourceLangSelector.value = sourceLang;
    elements.targetLangSelector.value = targetLang;
    elements.sourceTextInput.value = sourceText;
    elements.mainTranslationInput.value = mainTranslation;
});



/* Update elements on page load *******************************************************************/

// ToDo: replace by Render
updateSourceLangSelector(elements.sourceLangSelector, api, sourceLang);
updateTargetLangSelector(elements.targetLangSelector, api, targetLang);

elements.sourceTextInput.update({ value: sourceText });
elements.mainTranslationInput.update({ value: mainTranslation });




const control = new Control(state, document);
// translation works
// state.sourceText = "안녕하세요";
// control.translate();