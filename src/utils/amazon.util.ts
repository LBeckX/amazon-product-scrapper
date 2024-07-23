export function generateProductUrl(productLink: string, asin: string): string {
    const url = new URL(productLink)
    url.search = ''

    const ext = url.pathname.split('/').pop()
    url.pathname = `/dp/${asin}/${ext === 'click' || !ext ? 'ref=' : ext}`

    return url.href
}