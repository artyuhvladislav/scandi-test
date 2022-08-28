import { OptionItemT } from "../containers/ProductPageContainer/ProductItemOption"
import { GetCategoryT } from "../redux/slices/headerSlice/headerSliceTypes"
import { GetProductT, ProductItemT } from "../redux/slices/homePageSlice/homePageSliceTypes"
import { GetProductItemT } from "../redux/slices/productSlice/productSliceTypes"

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

export const getProductItemHelper = (data: GetProductItemT) => {
    return data.data.product
}

export const getProductIdFromUrl = () => {
    return window.location.pathname.replace('/id/', '')
}

export const setBorderStyle = (value: string) => {
    return value.toLocaleLowerCase().startsWith('#f') && '1px solid #000'
}

export const getSelectedOption = (target: HTMLElement, options: OptionItemT[], parentNode: React.RefObject<HTMLUListElement>) => {
    let element;
    if (target.parentElement === parentNode?.current) {
        element = target;
    } else {
        element = target.parentElement;
    }
    const idx = Array.prototype.indexOf.call(parentNode.current?.children, element);
    if (idx !== -1) {
        const selectedOption = options.find((_, i) => idx === i);
        return selectedOption
    } else {
        return { value: '' } as OptionItemT
    }

};