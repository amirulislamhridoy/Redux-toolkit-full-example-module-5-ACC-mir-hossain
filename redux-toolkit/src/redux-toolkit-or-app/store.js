import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import filterSlice from './features/filterSlice';
import productSlice from './features/productSlice'

const store = configureStore({
    reducer: {
        products : productSlice, 
        filter: filterSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store;