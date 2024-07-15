export interface IProduct {
    image: string,
    images: string[],
    title: string,
    link: string,
    price: {
        amount: string,
        currency: string,
        basisPrice: string,
        discountPercent?: string,
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
