// ToDo:
// class Render; constructor(currentStateObj, {all html nodes})
// Render.initSourceLangOptions(langs, api)
//  variant 1: Render.updateSomeElement(no params)
//  variant 2: if (element instanceof HTMLTextAreaElement) updateHTMLTextAreaElement(params)

/**
 * 
 * @param {HTMLSelectElement} element 
 * @param {String} api 
 */
export const renderSourceLangSelector = (element, sourceLang, langs) => {
    for (const key in langs) {
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = langs[key];
        element.appendChild(option);
    }
    element.value = sourceLang;
};

export const renderTargetLangSelector = (element, targetLang, langs) => {
    for (const key in langs) {
        if (key === "auto") continue;

        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = langs[key];
        element.appendChild(option);
    }
    element.value = targetLang;
};

/**@param { {translation: {otherTranslations: Array<{pos: String, translations: string[]}>}, mainTranslation: string } } state */
export const renderMoreOptionsEntries = (state) => {
    const {otherTranslations} = state.translation;
    
    const otherTranslationsElement = document.getElementById("other-translations");
    otherTranslationsElement.innerHTML = ""; // clear immediately

    if (!otherTranslations) {
        return; // return if no other translations
    }

    for (const translation of otherTranslations) {
        const translationsListElement = document.createElement("div");

        const translationCategoryElement = document.createElement("p");
        translationCategoryElement.innerHTML = translation.pos + ": "; // noun, verb, etc
        translationsListElement.appendChild(translationCategoryElement); // insert into translationsListElement

        translation.translations.forEach(str => {
            const buttonWithTranslation = document.createElement("button");
            buttonWithTranslation.innerHTML = str;
            buttonWithTranslation.addEventListener("click", () => state.mainTranslation = str); // change mainTranslation in state object

            translationsListElement.appendChild(buttonWithTranslation); // insert into translationsListElement
        });

        otherTranslationsElement.appendChild(translationsListElement); // insert into otherTranslationsElement (#other-translations)
    }

};