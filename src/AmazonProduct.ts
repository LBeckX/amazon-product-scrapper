import {RequestService} from "./services/request.service.js";
import cheerio from "cheerio";
import {safeCheerio} from "./utils/cheerio.util.js";
import {clearText} from "./utils/text.util.js";
import {IProduct, IReview} from "./types/IProduct.js";

export class AmazonProduct {

    public html?: string

    public product?: IProduct

    protected baseUrl?: URL

    async getProduct(url: string) {
        this.baseUrl = new URL(url)
        this.baseUrl.search = ''
        const response = await (new RequestService()).get(this.baseUrl, {timeout: 10000})

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

        this.product = {
            image: $('#imgTagWrapperId img').attr('src') as string,
            images: $('#imageBlock_feature_div').html()?.match(/(?<="hiRes":")(https:.*?)(?=")/g) || [],
            title,
            titles: [title],
            link: this.baseUrl?.href as string,
            price: {
                amount: clearText($('.a-price.priceToPay').first().text()),
                discountPercent: clearText($('.savingsPercentage').first().text()),
                currency: clearText($('.a-price.priceToPay .a-price-symbol').first().text()),
                basisPrice: clearText($('.basisPrice .a-price > span').first().text()),
            },
            rating: {
                classes: $('#averageCustomerReviews .a-icon-star').attr('class') as string,
                description: clearText($('#averageCustomerReviews .a-icon-star > span').first().text()),
                amount: clearText($('#acrCustomerReviewText').first().text())
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