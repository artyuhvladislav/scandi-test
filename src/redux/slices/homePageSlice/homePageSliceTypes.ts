import { Status } from "../headerSlice/headerSliceTypes"

export type GetProductT = {
    data: {
        category: {
            products: ProductItemT[]
        }
    }
}

export type ProductAttributeT = {
    id: string
    name: string
    type: string
    items: {
        displayValue: string
        value: string
        id: string
    }
}

export type ProductPriceT = {
    amount: number,
    currency: {
        label: string
        symbol: string
    }

}

export interface ProductItemT {
    id: string
    name: string
    inStock: boolean
    gallery: string[]
    description: string
    category: string
    attributes: ProductAttributeT[]
    prices: ProductPriceT[]
    brand: string
}

export interface HomePageStateI {
    products: ProductItemT[],
    activeProducts: ProductItemT[],
    currentPage: number,
    maxProductsCount: number,
    status: Status,
}