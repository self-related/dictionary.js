function getGoogleApiURL(sourceLang, targetLang, sourceText, api) {
    switch (api) {
        case "google": 
            return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${sourceText}`;
        default: 
            return null;
    }
}

export async function getTranslation(sourceLang, targetLang, sourceText, api) {
    const url = getGoogleApiURL(sourceLang, targetLang, sourceText, api);
    const response = await fetch(url, {cache: "force-cache"});
    console.log(response);
}