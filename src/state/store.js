import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export default configureStore({
    reducer: {
        counter: counterReducer, // adding a created slice to the store
    }
})