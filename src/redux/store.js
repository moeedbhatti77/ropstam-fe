import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'

export const authStore = configureStore({
    reducer: {
        data: authReducer,
    },
    devTools: true
})