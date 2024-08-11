import { configureStore } from '@reduxjs/toolkit'
import typingReducer from './typingSlice'

// Создаем Redux store
const store = configureStore({
	reducer: {
		typing: typingReducer,
	},
})

export default store
