import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getProductItemQuery } from '../../../graphql/query';
import { getProductItemHelper, setDefaultSelectedAttribute } from '../../../utils';
import { Status } from '../headerSlice/headerSliceTypes';
import { GetProductItemT, ProductStateI } from './productSliceTypes';
import { BASE_URL } from '../../../constants/index';
import { ProductItemT, ProductPriceT, SelectedAttributeT } from '../homePageSlice/homePageSliceTypes';
import { OptionItemT } from '../../../containers/ProductPageContainer/ProductItemOption';

const defaultState: ProductStateI = {
    product: {} as ProductItemT,
    status: Status.LOADING,
    price: {} as ProductPriceT,
}

// const attributes = setDefaultSelectedAttribute(defaultState.product.attributes)

const initialState: ProductStateI = { ...defaultState }

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
            state.product.attributes = setDefaultSelectedAttribute(state.product.attributes)
        },
        setSelectedAttribute: (state, action: PayloadAction<any>) => {
            state.product.attributes = state.product.attributes.map(atr => {
                if (atr.name === action.payload.name) {
                    return { ...atr, selectedItem: action.payload.selectedItem }
                }
                return atr
            })
        },
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

export const { setProduct, setSelectedAttribute } = productSlice.actions
export default productSlice.reducer