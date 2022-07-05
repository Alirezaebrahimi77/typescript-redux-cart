import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import type {Product} from "../productTypes/ProductTypes"

interface ProductState {
    products: Product[]
    loading: Boolean
    error?: any,
    singleProduct: Product | null
}



export const fetchProducts = createAsyncThunk("Fetch All Products", async (_,{rejectWithValue}) => {
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`)
        
        return data.products

    }catch(err: any){
        return rejectWithValue(err.response.data)
    }

})
export const fetchSingleProduct = createAsyncThunk("Fetch Single Product", async (id: string,{rejectWithValue}) => {
    try{
        
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`)
        
        return data.product

    }catch(err: any){
        return rejectWithValue(err.response.data)
    }

})
export const clearErrors = createAsyncThunk("product/clearErrors", async () => {
    const data = null;
    return data
})

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    singleProduct: null
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.payload
        })

        builder.addCase(fetchSingleProduct.pending, (state) => {
            state.loading = true
        }).addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.loading = false
            state.singleProduct = action.payload
        }).addCase(fetchSingleProduct.rejected, (state, action) => {
            state.loading = false
            state.singleProduct = null
            state.error = action.payload
        })
        builder.addCase(clearErrors.pending, (state, action) => {
            state.error = null
        }).addCase(clearErrors.fulfilled, (state, action) => {
            state.error = null
        }).addCase(clearErrors.rejected, (state, action) => {
            state.error = null
        })


    }
})

export default productSlice.reducer