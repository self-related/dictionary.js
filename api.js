/**
 * @typedef {{ 
 *  sourceText: String, 
 *  mainTranslation: String, 
 *  otherTranslations: Array<{pos: String, translations: string[]}>
 * }} Translation
 * 
 * 
 * @typedef {Object} Api
 * @prop {function({ sourceLang: String, targetLang: String, sourceText: String }): string} getUrl
 * @prop {function({ sourceLang: String, targetLang: String, sourceText: String }): Promise<Translation>} getTranslation
 * @prop {Object.<string, string>} langs
 * 
 * 
 * @typedef {Object} ApiMap
 * @prop {Api} google
 * 
 * 
 * @typedef {Object.<string, Api>} ApiMapAny expose Api props when called as api["some_api"]
 */


/**@type { ApiMap & ApiMapAny } */
export const api = {
    google: {
        getTranslation: async ({sourceLang, targetLang, sourceText}) => {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${sourceText}`;
            const json = await fetch(url).then(data => data.json());
            return {
                sourceText: json.sentences[0].orig,
                mainTranslation: json.sentences[0].trans,
                otherTranslations: json.dict?.map(dict => ({
                    pos: dict.pos,
                    translations: dict.terms 
                })),
            };
        },
        langs: {
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
        },
    },
}