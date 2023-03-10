import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    brands: [],
    stock: false
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChoose: (state, action) => {
            if(state.brands.find(s => s === action.payload)){
                state.brands = [...state.brands.filter(s => s !== action.payload)]
            }else{
                state.brands.push(action.payload)
            }
        }, 
        stockStatus: (state) => {
            state.stock = !state.stock
        }, 
        clearAll: (state, action) => {
            state.brands = []
            state.stock = false
        }
    }
})

export const {filterChoose, stockStatus, clearAll}  = filterSlice.actions;
export default filterSlice.reducer