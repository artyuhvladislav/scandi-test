import { GetCategoryT } from "../redux/slices/headerSlice/headerSliceTypes"
import { GetProductT, ProductItemT } from "../redux/slices/homePageSlice/homePageSliceTypes"

export const setActiveProducts = (
    maxProductsCount: number,
    currentPage: number,
    products: ProductItemT[]) => {

    let start = maxProductsCount * (currentPage - 1)
    let end = maxProductsCount * currentPage
    const activeProducts = products.filter((_, idx) => start <= idx && end > idx)

    return activeProducts
}

export const getCategoryHelper = (data: GetCategoryT) => {
    return [...data.data.categories]
}

export const getProductHelper = (data: GetProductT) => {
    return [...data.data.category.products]
}