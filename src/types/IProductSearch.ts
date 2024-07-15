import {IProduct} from "./IProduct.js";

export interface IProductSearch {
    products: IProduct[],
    page: number,
    pages: number,
    url: string
}