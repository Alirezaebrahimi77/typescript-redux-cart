import  axios  from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {Product} from "../productTypes/ProductTypes"

interface CartStateInterface {
    cartItems: Product[],
    loading: boolean,
    error: any,
    showCart: boolean
}

type actionTypes = {
    id: string,
    product: Product
}

type addItemTypes = {
    id: string,
    product: Product,
    quantity: number
}

type CartData = {
    id: string,
    quantity: number
}


export const increaseQty = createAsyncThunk("product/increaseQty", (async (id: string, {rejectWithValue}) => {
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`)
        const product: actionTypes= {
            id,
            product: data.product
        }
        return product
        

    }catch(err: any){
        return rejectWithValue(err.response.data)
    }
}))
export const addItem = createAsyncThunk("/product/addItem", (async (cartData: CartData, {rejectWithValue}) => {
    try{
        const {id, quantity} = cartData;

        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`)

        const product= {
            id,
            product: data.product,
            quantity
        }

        return product

    }catch(err: any){
        return rejectWithValue(err.response.data)
    }
}))



const initialState = {
    cartItems: localStorage.getItem("typescriptCartItems") ? JSON.parse(localStorage.getItem("typescriptCartItems") || "") : [],
    loading: false,
    error: null,
    showCart: false
} as CartStateInterface


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        toggleCart: (state) => {
            state.showCart = !state.showCart
        },
        decreaseQty: (state, action) => {
            // Find item
            const item = state.cartItems.find(item => item._id === action.payload)
            // if item quantity is 1, remove it
            if(item?.quantity === 1){
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
                localStorage.setItem("typescriptCartItems", JSON.stringify(state.cartItems))
            }else{
                // decrease its quantity by 1
                state.cartItems = state.cartItems.map(product => product._id === action.payload ? {...product, quantity: product.quantity - 1} : product)
                localStorage.setItem("typescriptCartItems", JSON.stringify(state.cartItems))
            }
        },
        clearErrors: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(increaseQty.pending, (state) => {
            state.loading = true
        }).addCase(increaseQty.fulfilled, (state, action: PayloadAction<actionTypes>) => {
            // Find item
            const item = state.cartItems.find(item => item._id === action.payload.id)
            // if doesn't exist, add it.
            if(!item){
                state.cartItems.push({...action.payload.product, quantity: 1})
                localStorage.setItem("typescriptCartItems", JSON.stringify(state.cartItems))
            }else{
                // increase its quantity by 1
                state.cartItems = state.cartItems.map(product => product._id === action.payload.id ? {...product, quantity: product.quantity + 1} : product)
                localStorage.setItem("typescriptCartItems", JSON.stringify(state.cartItems))
            }
            state.loading = false
        }).addCase(increaseQty.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })


        builder.addCase(addItem.pending, (state) => {
            state.loading = true
        }).addCase(addItem.fulfilled, (state, action: PayloadAction<addItemTypes>) => {
            // Find item
            const item = state.cartItems.find(item => item._id === action.payload.id)
            // if doesn't exist, add it.
            if(!item){
                state.cartItems.push({...action.payload.product, quantity: action.payload.quantity})
                localStorage.setItem("typescriptCartItems", JSON.stringify(state.cartItems))
            }else{
                // increase its quantity by 1
                state.cartItems = state.cartItems.map(product => product._id === action.payload.id ? {...product, quantity: product.quantity + action.payload.quantity} : product)
                localStorage.setItem("typescriptCartItems", JSON.stringify(state.cartItems))
            }
            state.loading = false
        }).addCase(addItem.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export const {toggleCart, decreaseQty, clearErrors} = cartSlice.actions
export default cartSlice.reducer