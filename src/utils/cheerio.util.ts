import Cheerio = cheerio.Cheerio;

export function safeCheerio(cheerio: Cheerio): Cheerio {
    cheerio.find('script, noscript, style, svg').remove()
    cheerio.find('*').removeAttr('script')
    cheerio.find('*').removeAttr('style')
    return cheerio
}

export function removeLinksCheerio(cheerio: Cheerio): Cheerio {
    cheerio.find('a').remove()
    return cheerio
}

export function removeImagesCheerio(cheerio: Cheerio): Cheerio {
    cheerio.find('img').remove()
    return cheerio
}