import { TAX } from "../constants"
import { OptionItemT } from "../containers/ProductPageContainer/ProductItemOption"
import { CartStateI } from "../redux/slices/cartSlice/cartSliceTypes"
import { CategoryItemT, GetCategoryT } from "../redux/slices/headerSlice/headerSliceTypes"
import { GetProductT, ProductAttributeT, ProductItemT } from "../redux/slices/homePageSlice/homePageSliceTypes"
import { GetProductItemT } from "../redux/slices/productSlice/productSliceTypes"

export const setActiveProducts = (
    maxProductsCount: number,
    currentPage: number,
    products: ProductItemT[]) => {

    // let start = maxProductsCount * (currentPage - 1)
    // let end = maxProductsCount * currentPage
    // const activeProducts = products.filter((_, idx) => start <= idx && end > idx)

    // return activeProducts
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
        const selectedOption = options.find((_, i) => idx === i) || {} as OptionItemT;
        return selectedOption
    } else {
        return { value: '' } as OptionItemT
    }
};

export const setActiveCurrency = (activeProducts: ProductItemT[] | ProductItemT, symbol: string) => {
    let id = 0;
    if (Array.isArray(activeProducts)) {
        activeProducts.forEach((product) => {
            product.prices.forEach((price, idx) => {
                if (price.currency.symbol === symbol) {
                    id = idx;
                    return id;
                }
            });
        });
    } else {
        activeProducts.prices?.forEach((price, idx) => {
            if (price.currency.symbol === symbol) {
                id = idx;
                return id;
            }
        });
    }
    return id;
}

export const calcTotalPriceWithTax = (price: number, tax = TAX) => {
    return Math.round(price * tax * 100) / 100;
}

export const setDefaultSelectedAttribute = (items: ProductAttributeT[]) => {
    return items.map((item) => ({ ...item, selectedItem: item.items[0] }))
}
export const setDefaultCurrentCategory = () => {
    const pathname = window.location.pathname
    const currentCategory = pathname.slice(1)
    const obj: CategoryItemT = {
        name: "all"
    }

    if (currentCategory) {
        if (localStorage.getItem('currentCategory')) {
            obj.name = localStorage.getItem('currentCategory') ?? 'all'
        } else {
            localStorage.setItem('currentCategory', currentCategory)
            obj.name = currentCategory
        }
    }
    return obj
}
const cartItems = 'cartItems'
const totalPrice = 'totalPrice'
const totalCount = 'totalCount'

export const setCartStateFromLS = (state: CartStateI) => {
    const obj = {
        items: state.items,
        totalCount: state.totalCount,
        totalPrice: state.totalPrice,
    }
    localStorage.setItem(cartItems, JSON.stringify(state.items))
    localStorage.setItem(totalPrice, JSON.stringify(state.totalPrice))
    localStorage.setItem(totalCount, JSON.stringify(state.totalCount))
    return obj
}

export const getCartStateFromLS = () => {
    let defaultState: CartStateI = {
        items: [],
        totalPrice: 0,
        totalCount: 0
    }
    if (localStorage.getItem(cartItems) && localStorage.getItem(totalPrice) && localStorage.getItem(totalCount)) {
        const obj = {} as CartStateI
        obj.items = JSON.parse(localStorage.getItem(cartItems) as string)
        obj.totalPrice = JSON.parse(localStorage.getItem(totalPrice) as string)
        obj.totalCount = JSON.parse(localStorage.getItem(totalCount) as string)
        return obj
    } else {
        return defaultState
    }
}