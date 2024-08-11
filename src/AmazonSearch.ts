import {IProduct} from "./types/IProduct.js";
import cheerio from "cheerio";
import {RequestService} from "./services/request.service.js";
import {clearText} from "./utils/text.util.js";
import {IProductSearch} from "./types/IProductSearch.js";
import {generateProductUrl} from "./utils/amazon.util.js";

export class AmazonSearch {
    public html?: string

    public products?: IProduct[]

    public page: number | null = null

    public pages: number | null = null

    protected baseUrl: URL

    constructor(url = 'https://www.amazon.de/') {
        this.baseUrl = new URL(url)
    }

    async search(keywords: string) {
        this.baseUrl.pathname = '/s'
        this.baseUrl.search = ''
        this.baseUrl.searchParams.set('k', keywords)

        if (this.page) {
            this.baseUrl.searchParams.set('page', this.page.toString())
        }

        const response = await (new RequestService()).get(this.baseUrl, {timeout: 10000})

        if (response.status !== 200 && response.status !== 201) {
            return null
        }

        this.html = response.data;

        return this.toJson()
    }

    toJson(): IProductSearch | null {
        if (!this.html) {
            return null
        }

        const $ = cheerio.load(this.html)

        this.products = []

        $('[data-component-type="s-search-result"][data-asin]').each((index, element) => {
            const searchResult = $(element)

            const asin = searchResult.attr('data-asin') as string

            const headlineLink = searchResult.find('h2 a').attr('href') as string

            if (!asin || !headlineLink) {
                return
            }

            const url = new URL(generateProductUrl(this.baseUrl.origin + headlineLink, asin))

            this.products?.push({
                asin: asin,
                image: searchResult.find('.s-product-image-container img').attr('src') as string,
                images: searchResult.find('.s-product-image-container img').attr('srcset')?.match(/http(.*?)(?=\s)/g) || [],
                title: clearText(searchResult.find('h2 span').text()),
                titles: searchResult.find('h2 span').map((index, element) => clearText($(element).text())).get(),
                link: url.href,
                price: {
                    amount: clearText(searchResult.find('.a-price[data-a-color="base"] span').first().text()),
                    basisPrice: clearText(searchResult.find('.a-price[data-a-color="secondary"] span').first().text()),
                    currency: clearText(searchResult.find('.a-price[data-a-color="base"] .a-price-symbol').first().text())
                },
                rating: {
                    classes: clearText(searchResult.find('[data-cy="reviews-block"] [data-cy="reviews-ratings-slot"]').attr('class') as string),
                    description: clearText(searchResult.find('[data-cy="reviews-block"] [data-cy="reviews-ratings-slot"] span').text()),
                    amount: searchResult.find('[data-csa-c-slot-id="alf-reviews"] a > span').text(),
                },
            })
        })

        this.pages = parseInt($('span.s-pagination-item').last().text())

        return {
            products: this.products,
            page: this.page || 1,
            pages: this.pages,
            url: this.baseUrl.href
        }
    }
}