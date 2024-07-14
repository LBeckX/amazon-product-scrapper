export interface IProduct {
    image?: string,
    images: string[],
    title: string,
    price: {
        amount: string,
        discountPercent?: string,
        currency?: string,
        basisPrice?: string,
    },
    rating: {
        classes?: string,
        description: string,
        amount: string
    },
    overview: {
        table?: string[][],
        bullets: string[],
    },
    details: {
        features: string[],
        tables: string[][]
    },
    reviews: {
        top: IReview[]
    }
}

export interface IReview {
    name: string,
    image?: string,
    classes?: string,
    title: string,
    content: string
}