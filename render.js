import { languagesGoogle } from "./translate.js";

/**
 * 
 * @param {HTMLSelectElement} element 
 * @param {String} api 
 */
export const updateSourceLangSelector = (element, api, sourceLang) => {
    console.log(1);
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