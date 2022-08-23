import { CurrencyItemT } from "../redux/slices/headerSlice"

export const setDefaultCurrency = (currencies: CurrencyItemT[]) => {
    return currencies[0]
}