export interface IProduct {
    asin: string,
    image: string,
    images: string[],
    title: string,
    titles: string[],
    link: string,
    price: {
        quantity: number | null, // Same like amount
        amount: number | null,
        currency: string,
        basisPrice: number | null,
        discountPercent?: number | null,
    },
    rating: {
        classes: string,
        description: string,
        amount: string
    },
    overview?: {
        table?: string[][],
        bullets?: string[],
    },
    details?: {
        features?: string[],
        tables?: string[][]
    },
    reviews?: {
        top?: IReview[]
    }
}

export interface IReview {
    name: string,
    image?: string,
    classes?: string,
    title: string,
    content: string
}
