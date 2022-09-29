import { TAX } from "../constants"
import { OptionItemT } from "../containers/ProductPageContainer/ProductItemOption"
import { CartItemI } from "../redux/slices/cartSlice/cartSliceTypes"
import { GetCategoryT } from "../redux/slices/headerSlice/headerSliceTypes"
import { GetProductT, ProductAttributeT, ProductItemT } from "../redux/slices/homePageSlice/homePageSliceTypes"
import { GetProductItemT } from "../redux/slices/productSlice/productSliceTypes"


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
    const itemsCopy: ProductAttributeT[] = JSON.parse(JSON.stringify(items))
    return itemsCopy.map((item) => ({ ...item, selectedItem: item.items[0] }))
}

export const addProductToCartHelper = (products: CartItemI[], productItem: CartItemI) => {
    let id = 0;
    let isSimilar = false;
    console.log()
    products.forEach(({ product }, idx) => {
        if (product.name === productItem.product.name) {
            const value = product.attributes.every((attribute, idx) => {
                return attribute?.selectedItem.value === productItem.product.attributes[idx].selectedItem.value
            })
            if (value) {
                isSimilar = true
                id = idx
            }
        }
    })
    return [isSimilar, id] as [boolean, number]
}
