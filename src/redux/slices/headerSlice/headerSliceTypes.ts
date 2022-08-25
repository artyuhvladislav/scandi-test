export type CurrencyItemT = {
    __typename?: string,
    symbol: string,
    label: string
}

export type CategoryItemT = {
    name: string
}

export type GetCategoryT = {
    data: {
        categories: CategoryItemT[]
    }
}

export interface HeaderStateI {
    currencies: CurrencyItemT[],
    currentCurrency: CurrencyItemT,
    status: Status,
    categories: CategoryItemT[],
    currentCategory: CategoryItemT
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}