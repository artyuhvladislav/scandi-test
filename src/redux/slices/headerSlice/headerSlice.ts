import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import { getCategoryQuery, getCurrencyQuery } from '../../../graphql/query';
import { getCategoryHelper, getCurrentCurrencyFromLS } from '../../../utils';
import { CategoryItemT, CurrencyItemT, GetCategoryT, HeaderStateI, Status } from './headerSliceTypes';

const { symbol, label } = getCurrentCurrencyFromLS()

const initialState: HeaderStateI = {
    currencies: [],
    currentCurrency: {
        symbol,
        label
    },
    status: Status.LOADING,
    categories: [],
    currentCategory: {
        name: ''
    }
}
type CurrencyData = {
    data: {
        currencies: CurrencyItemT[];
    };
};

export const getCurrency = createAsyncThunk(
    "post/getCurrency",
    async () => {
        const { data } = await axios.post<CurrencyData>(BASE_URL, {
            query: getCurrencyQuery
        });
        return data.data.currencies as CurrencyItemT[];
    }
);

export const getCategory = createAsyncThunk(
    "post/getCategory",
    async () => {
        const { data } = await axios.post<CategoryItemT[]>(BASE_URL, {
            query: getCategoryQuery
        });
        const result = getCategoryHelper(data as unknown as GetCategoryT)
        return result as CategoryItemT[]
    }
);

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<CurrencyItemT[]>) => {
            state.currencies = action.payload
        },
        setCurrentCurrency: (state, action: PayloadAction<CurrencyItemT>) => {
            state.currentCurrency = action.payload
            const json = JSON.stringify(state.currentCurrency);
            localStorage.setItem('currentCurrency', json);
        },
        setCategories: (state, action: PayloadAction<CategoryItemT[]>) => {
            state.categories = action.payload
        },
        setCurrentCategory: (state, action: PayloadAction<CategoryItemT>) => {
            state.currentCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrency.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.currencies = action.payload;
        });

        builder.addCase(getCurrency.pending, (state) => {
            state.status = Status.LOADING;
            state.currencies = [];
        });

        builder.addCase(getCurrency.rejected, (state) => {
            state.status = Status.ERROR;
            state.currencies = [];
        })

        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.categories = action.payload;
        });

        builder.addCase(getCategory.pending, (state) => {
            state.status = Status.LOADING;
            state.categories = [];
        });

        builder.addCase(getCategory.rejected, (state) => {
            state.status = Status.ERROR;
            state.categories = [];
        })
    },
})

export const {
    setCurrencies,
    setCurrentCurrency,
    setCategories,
    setCurrentCategory } = headerSlice.actions
export default headerSlice.reducer