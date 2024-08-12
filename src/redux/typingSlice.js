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
	name: 'typing', // Название среза.
	initialState, // Начальное состояние среза.
	reducers: {
		// Устанавливаем текст для набора.
		setTextToType(state, action) {
			state.textToType = action.payload // Обновляем текст, который необходимо набирать.
		},

		// Устанавливаем текущее значение ввода пользователя.
		setInputValue(state, action) {
			state.inputValue = action.payload // Обновляем текущее значение ввода.
		},

		// Увеличиваем счетчик ошибок.
		incrementErrors(state) {
			state.errors += 1 // Увеличиваем количество ошибок на 1.
		},

		// Сбрасываем состояние до первоначального, устанавливая новый текст для набора.
		reset(state, action) {
			return { ...initialState, textToType: action.payload } // Возвращаем новое состояние с первоначальным состоянием и новым текстом.
		},

		// Обновляем значение слов в минуту (WPM).
		updateWPM(state, action) {
			state.wpm = action.payload // Устанавливаем новое значение WPM.
		},

		// Устанавливаем состояние завершения набора текста.
		setFinished(state) {
			state.finished = true // Отмечаем, что набор текста завершен.
			state.startTime = null // Сбрасываем время начала, так как набор завершен.
		},

		// Устанавливаем время начала набора текста.
		setStartTime(state, action) {
			state.startTime = action.payload // Обновляем время начала набора.
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
