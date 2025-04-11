export function getAllElements() {
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

    return {
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
}