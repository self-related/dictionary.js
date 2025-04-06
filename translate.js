function getGoogleApiURL(sourceLang, targetLang, sourceText, api) {
    switch (api) {
        case "google": 
            return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${sourceText}`;
        default: 
            return null;
    }
}

/**
 * @param {String} sourceLang 
 * @param {String} targetLang 
 * @param {String} sourceText 
 * @param {String} api 
 */
export async function getTranslation(sourceLang, targetLang, sourceText, api) {
    const url = getGoogleApiURL(sourceLang, targetLang, sourceText, api);
    const response = await fetch(url).then(data => data.json());
    console.log(response); // temp
}