// ToDo:
// class Render; constructor(currentStateObj, {all html nodes})
// Render.initSourceLangOptions(langs, api)
// Render.updateSomeElement(no params)


import { languagesGoogle } from "./translate.js";

/**
 * 
 * @param {HTMLSelectElement} element 
 * @param {String} api 
 */
export const updateSourceLangSelector = (element, api, sourceLang) => {
    if (api === "google") {
        for (const key in languagesGoogle) {
            const option = document.createElement("option");
            option.value = key;
            option.innerHTML = languagesGoogle[key];
            element.appendChild(option);
        }
        element.value = sourceLang;
    }
};

export const updateTargetLangSelector = (element, api, targetLang) => {
    if (api === "google") {
        for (const key in languagesGoogle) {
            if (key === "auto")
                continue;
            const option = document.createElement("option");
            option.value = key;
            option.innerHTML = languagesGoogle[key];
            element.appendChild(option);
        }
        element.value = targetLang;
    }
};