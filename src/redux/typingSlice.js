import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	textToType: '',
	inputValue: '',
	errors: 0,
	startTime: null,
	wpm: 0,
	finished: false,
}

// Создаём слайс для управления состоянием
const typingSlice = createSlice({
	name: 'typing',
	initialState,
	reducers: {
		setTextToType(state, action) {
			state.textToType = action.payload
		},
		setInputValue(state, action) {
			state.inputValue = action.payload
		},
		incrementErrors(state) {
			state.errors += 1
		},
		reset(state) {
			return initialState
		},
		updateWPM(state, action) {
			state.wpm = action.payload
		},
		setFinished(state) {
			state.finished = true
			state.startTime = null
		},
		setStartTime(state, action) {
			state.startTime = action.payload
		},
	},
})

// Экспортируем действия
export const {
	setTextToType,
	setInputValue,
	incrementErrors,
	reset,
	updateWPM,
	setFinished,
	setStartTime,
} = typingSlice.actions

// Экспортируем редьюсер
export default typingSlice.reducer
