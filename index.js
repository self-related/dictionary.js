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

    /**@type {?HTMLButtonElement} #auto-translate */
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



/* Event Listeners *******************************************************************/

// Start translation if translateAutomatically is true
sourceTextInput.addEventListener("input", (event) => {
    if (translateAutomatically) {
        sourceText = event.currentTarget.value;
        // call api
    }
});

// Change main translation when typing
translatedTextInput.addEventListener("input", (event) => mainTranslation = event.currentTarget.value);

// Start translation on click
translateBtn.addEventListener("click", () => {
    sourceText = sourceTextInput.value;
    // call api
});