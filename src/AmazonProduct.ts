import {RequestService} from "./services/request.service.js";
import * as cheerio from "cheerio";
import {safeCheerio} from "./utils/cheerio.util.js";
import {clearText} from "./utils/text.util.js";
import {IProduct, IReview} from "./types/IProduct.js";
import {generateProductUrl} from "./utils/amazon.util.js";

export class AmazonProduct {

    public html?: string

    public product?: IProduct

    protected baseUrl?: URL

    async getProduct(url: string, lang = 'de_DE', i18nPrefs = 'EUR') {
        this.baseUrl = new URL(url)
        this.baseUrl.search = ''
        const response = await (new RequestService()).get(this.baseUrl, {timeout: 10000, lang, i18nPrefs})

        if (response.status !== 200 && response.status !== 201) {
            return null
        }

        this.html = response.data;

        return this.toJson()
    }

    public toJson() {
        if (!this.html) {
            return null
        }

        const $ = cheerio.load(this.html)

        const title = clearText($('#productTitle').text())

        const asin = $('#ASIN').attr('value') as string || $('#asin').attr('value') as string

        const uri = new URL(generateProductUrl(this.baseUrl?.href as string, asin))

        const currency = clearText($('.a-price.priceToPay .a-price-symbol').first().text())
        const amount = clearText($('.a-price.priceToPay').first().text()).replace(currency, '').replace(',', '.')
        const basisPrice = clearText($('.basisPrice .a-price > span').first().text()).replace(currency, '').replace(',', '.')
        const discountPercent = clearText($('.savingsPercentage').first().text())

        this.product = {
            asin: asin,
            image: $('#imgTagWrapperId img').attr('src') as string,
            images: $('#imageBlock_feature_div').html()?.match(/(?<="hiRes":")(https:.*?)(?=")/g) || [],
            title,
            titles: [title],
            link: uri.href,
            price: {
                quantity: amount ? parseFloat(amount) : null,
                amount: amount ? parseFloat(amount) : null,
                discountPercent: discountPercent ? parseFloat(discountPercent) : null,
                currency,
                basisPrice: basisPrice ? parseFloat(basisPrice) : null,
            },
            rating: {
                classes: $('#averageCustomerReviews .a-icon-star').attr('class') as string,
                description: clearText($('#averageCustomerReviews .a-icon-star > span').first().text()),
                amount: clearText($('#acrCustomerReviewText').first().text()).split(' ')[0]
            },
            overview: {
                table: this._getTableData(safeCheerio($('#productOverview_feature_div table')), $),
                bullets: safeCheerio($('#feature-bullets li')).map((i, el) => $(el).text()).get(),
            },
            details: {
                features: this._getProductFeaturesByProducer($),
                tables: this._getTechnicalDetailTables($)
            },
            reviews: {
                top: this._getTopReviews($)
            }
        }

        return this.product
    }

    protected _getProductFeaturesByProducer($: cheerio.Root): any[] {
        const features: any[] = []
        safeCheerio($('#aplus_feature_div #aplus .celwidget')).each((i, widget) => {
            features[i] = $(widget).html()?.trim().replace(/\s\s+/ig, '')
        })
        return features
    }

    protected _getTechnicalDetailTables($: cheerio.Root): any[] {
        const tables: any[] = []
        safeCheerio($('#prodDetails .prodDetTable')).each((i, table) => tables.push(this._getTableData($(table), $)))
        return tables
    }

    protected _getTopReviews($: cheerio.Root): IReview[] {
        const reviews: IReview[] = []
        safeCheerio($('#customerReviews .review-views [id*=review-card]')).each((i, el) => {
            const reviewCard = $(el)
            reviews.push({
                name: clearText(reviewCard.find('.a-profile .a-profile-name').text()),
                image: reviewCard.find('.a-profile-avatar img').attr('data-src'),
                classes: reviewCard.find('i.review-rating').attr('class'),
                title: clearText(reviewCard.find(".review-title-content > span").text()),
                content: clearText(reviewCard.find('.review-text .review-text-content').text())
            })
        })
        return reviews
    }

    protected _getTableData(el: cheerio.Cheerio, $: cheerio.Root): string[][] {
        const table: any[] = []
        const rows = el.find('tr')

        rows.each((i, rowEl) => {
            table[i] = []
            const row = $(rowEl)
            const tds = row.find('> *')
            tds.each((j, td) => {
                table[i][j] = clearText($(td).text()) || ''
            })
        })
        return table
    }
}