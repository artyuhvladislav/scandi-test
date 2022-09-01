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

