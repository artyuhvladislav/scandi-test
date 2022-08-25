import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getProductQuery } from '../../../graphql/query';
import { getProductHelper, setActiveProducts } from '../../../utils';
import { Status } from '../headerSlice/headerSliceTypes';
import { GetProductT, HomePageStateI, ProductItemT } from './homePageSliceTypes';
import { BASE_URL } from './../../../constants/index';

const initialState: HomePageStateI = {
    products: [],
    activeProducts: [],
    currentPage: 1,
    maxProductsCount: 6,
    status: Status.LOADING,
}

export const getProduct = createAsyncThunk(
    "post/getProduct",
    async (category: string) => {
        const { data } = await axios.post<ProductItemT[]>(BASE_URL, {
            query: getProductQuery(category)
        });

        const result = getProductHelper(data as unknown as GetProductT)
        return result as ProductItemT[]
    }
);

const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductItemT[]>) => {
            state.products = action.payload
            state.activeProducts = setActiveProducts(
                state.maxProductsCount,
                state.currentPage,
                state.products
            )
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
            state.activeProducts = setActiveProducts(
                state.maxProductsCount,
                state.currentPage,
                state.products
            )
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.products = action.payload;
        });

        builder.addCase(getProduct.pending, (state) => {
            state.status = Status.LOADING;
            state.products = [];
        });

        builder.addCase(getProduct.rejected, (state) => {
            state.status = Status.ERROR;
            state.products = [];
        })
    },
})

export const { setProducts, setCurrentPage } = homePageSlice.actions
export default homePageSlice.reducer