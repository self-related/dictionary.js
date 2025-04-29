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