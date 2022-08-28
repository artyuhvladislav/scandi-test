import { Status } from "../headerSlice/headerSliceTypes"
import { ProductItemT, ProductPriceT } from "../homePageSlice/homePageSliceTypes"

export type GetProductItemT = {
    data: {
        product: ProductItemT
    }
}

export interface ProductStateI {
    product: ProductItemT,
    status: Status,
    price: ProductPriceT
}

// export type GetProductT = {
//     data: {
//         category: {
//             products: ProductItemT[]
//         }
//     }
// }

// export type ProductAttributeT = {
//     id: string
//     name: string
//     type: string
//     items: {
//         displayValue: string
//         value: string
//         id: string
//     }
// }

// export type ProductPriceT = {
//     amount: number,
//     currency: {
//         label: string
//         symbol: string
//     }

// }

// export type ProductItemT = {
//     id: string
//     name: string
//     inStock: Boolean
//     gallery: string
//     description?: string
//     category?: string
//     attributes?: ProductAttributeT
//     prices: ProductPriceT[]
//     brand: string
// }

// export interface HomePageStateI {
//     products: ProductItemT[],
//     activeProducts: ProductItemT[],
//     currentPage: number,
//     maxProductsCount: number,
//     status: Status,
// }