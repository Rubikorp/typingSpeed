import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Character, InputContainer } from '../styles/TextInputStyles'

import CountdownTimer from './Timer'
import {
	incrementErrors,
	setFinished,
	setInputValue,
	setStartTime,
} from '../redux/typingSlice'
import { measureWPM } from '../utils/wpm'

const TextInput = () => {
	const dispatch = useDispatch()
	const startTime = useSelector(state => state.typing.startTime)
	const finished = useSelector(state => state.typing.finished)
	const textToType = useSelector(state => state.typing.textToType)
	const inputValue = useSelector(state => state.typing.inputValue)
	const indexRef = useRef(0) // Используем ref для отслеживания текущего индекса

	// при сбросе сбрасывает ref
	useEffect(() => {
		indexRef.current = 0
	}, [textToType])

	// Эффект для отслеживания нажатий клавиш
	useEffect(() => {
		const handleKeyDown = event => {
			const key = event.key

			// Проверяем, является ли нажатая клавиша символом для ввода
			if (key.length === 1) {
				// Если нажатый символ правильный
				if (key === textToType[indexRef.current]) {
					dispatch(setInputValue(inputValue + key))
					indexRef.current += 1

					// Проверяем, завершен ли ввод
					if (indexRef.current === textToType.length) {
						dispatch(setFinished(true))
					}
				} else {
					// Увеличиваем количество ошибок и добавляем неправильный символ

					if (!inputValue.endsWith(key)) {
						dispatch(setInputValue(inputValue + key))
						indexRef.current += 1
						dispatch(incrementErrors())
					}
				}
			} else if (key === 'Backspace') {
				// Удаляем последний символ при нажатии Backspace
				dispatch(setInputValue(inputValue.slice(0, -1)))
				if (indexRef.current > 0) indexRef.current -= 1 // Уменьшаем индекс при удалении
			}
		}

		if (inputValue.length === 1) {
			dispatch(setStartTime(30))
			console.log(inputValue)
		}

		// Добавляем обработчик события клавиатуры
		window.addEventListener('keydown', handleKeyDown)

		// Убираем обработчик при размонтировании компонента
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [dispatch, textToType, inputValue])

	return (
		<InputContainer>
			{startTime ? <CountdownTimer /> : ''}
			{textToType.split('').map((char, index) => {
				const inputChar = inputValue[index]
				const isError = inputChar !== undefined && inputChar !== char
				const isCorrect = inputChar === char

				return (
					<Character key={index} isError={isError} isCorrect={isCorrect}>
						{char}
					</Character>
				)
			})}
		</InputContainer>
	)
}

export default TextInput
