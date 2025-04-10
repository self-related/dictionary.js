export const languagesGoogle = {
    auto: "Auto",
    en: "English",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    cs: "Czech",
    eo: "Esperanto",
    nl: "Dutch",
    et: "Estonian",
    fi: "Finnish",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    kk: "Kazakh",
    ko: "Korean",
    la: "Latin",
    mn: "Mongolian",
    no: "Norwegian",
    pl: "Polish",
    ro: "Romanian",
    ru: "Russian",
    es: "Spanish",
    sv: "Swedish",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian"
};


function getGoogleApiURL(sourceLang, targetLang, sourceText, api) {
    switch (api) {
        case "google": 
            return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${sourceText}`;
        default: 
            return null;
    }
}


/**
 * @typedef {{ sourceText: String, mainTranslation: String, moreOptions: Array }} TranslationResult
 *  
 * @param {String} api 
 * @returns {TranslationResult}
 */
function transformJson(json, api) {
        /**@type {TranslationResult} */
    let result = null;
    switch (api) {
        case "google":
            result = {
                sourceText: json.sentences[0].orig,
                mainTranslation: json.sentences[0].trans,
                otherTranslations: json.dict?.map(dict => ({
                    pos: dict.pos,
                    translations: dict.terms 
                }))
            }
            break;
    }
    return result;
}


/**
 * @param {String} sourceLang 
 * @param {String} targetLang 
 * @param {String} sourceText 
 * @param {String} api 
 * @returns {Promise<TranslationResult>}
 */
export async function getTranslation(sourceLang, targetLang, sourceText, api) {
    const url = getGoogleApiURL(sourceLang, targetLang, sourceText, api);
    const json = await fetch(url).then(data => data.json());

    return transformJson(json, api);
}