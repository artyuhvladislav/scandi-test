import { ProductItemT } from "../homePageSlice/homePageSliceTypes"

export interface CartStateI {
    items: CartItemI[],
    totalCount: number,
    totalPrice: number
}

export type CartAttributeT = {
    id: string
    name: string
    type: string
    items: {
        displayValue: string
        value: string
        id: string
    }
}

export type CartPriceT = {
    amount: number,
    currency: {
        label: string
        symbol: string
    }

}

export interface CartItemI {
    product: ProductItemT
    count: number
}