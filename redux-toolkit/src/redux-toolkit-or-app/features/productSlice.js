import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios.config';

const initialState = {
    products: [],
    isLoading: false,
    error: null,
    cart: [],
    postSuccess: false
}

export const fetchProduct = createAsyncThunk('product/fetchProduct', async () =>{
    const data = await axios.get('/')
    return data.data
})
export const addProduct = createAsyncThunk('product/addProduct', async (product) =>{
    const data = await axios.post('/add', product)
    return data.data
})
export const removeProduct = createAsyncThunk('product/removeProduct', async (_id, thunkApi) =>{
    const dispatch = thunkApi.dispatch
    const data = await axios.delete(`/remove/${_id}`)
    dispatch(removeFromCart(_id))
    return data.data
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            let exist = state.cart.find(s => s._id === action.payload._id)
            if(exist){
                const newProduct = {...exist, quantity : exist.quantity + 1}
                state.cart = [...state.cart.filter(s => s._id !== action.payload._id), newProduct]
            }else{
                const newProduct = {...action.payload, quantity: 1}
                state.cart = [...state.cart, newProduct]
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(s => s._id !== action.payload)
            // state.products = [...state.products.filter(s => s._id !== action.payload)]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.products = [];
            state.isLoading = true;
            state.error = null
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.error = null
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.products = []
            state.isLoading = false
            state.error = action.error.message
        })
        .addCase(addProduct.pending, (state, action) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null
            state.postSuccess = true
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
            state.postSuccess = false
        })
    }
})

export const {addToCart, removeFromCart} = productSlice.actions

export default productSlice.reducer