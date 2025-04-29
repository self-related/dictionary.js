export const api = {
    google: {
        /**@param {{sourceLang: String, targetLang: String, sourceText: String}} */
        getUrl: ({sourceLang, targetLang, sourceText}) => `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${sourceText}`,
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