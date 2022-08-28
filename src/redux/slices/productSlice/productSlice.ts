import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getProductItemQuery } from '../../../graphql/query';
import { getProductItemHelper } from '../../../utils';
import { Status } from '../headerSlice/headerSliceTypes';
import { GetProductItemT, ProductStateI } from './productSliceTypes';
import { BASE_URL } from '../../../constants/index';
import { ProductItemT, ProductPriceT } from '../homePageSlice/homePageSliceTypes';

const initialState: ProductStateI = {
    product: {} as ProductItemT,
    status: Status.LOADING,
    price: {} as ProductPriceT

}

export const fetchProduct = createAsyncThunk(
    "post/fetchProduct",
    async (id: string) => {
        const { data } = await axios.post<ProductItemT>(BASE_URL, {
            query: getProductItemQuery(id)
        });

        const result = getProductItemHelper(data as unknown as GetProductItemT)
        return result as ProductItemT
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductItemT>) => {
            state.product = action.payload;
            state.price = action.payload.prices[0]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.product = action.payload;
            state.price = action.payload.prices[0]
        });

        builder.addCase(fetchProduct.pending, (state) => {
            state.status = Status.LOADING;
            state.product = {} as ProductItemT;
        });

        builder.addCase(fetchProduct.rejected, (state) => {
            state.status = Status.ERROR;
            state.product = state.product = {} as ProductItemT;
        })
    },
})

export const { setProduct } = productSlice.actions
export default productSlice.reducer