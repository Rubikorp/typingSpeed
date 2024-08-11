import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Character, InputContainer } from '../styles/TextInputStyles'

import {
	incrementErrors,
	setFinished,
	setInputValue,
} from '../redux/typingSlice'

const TextInput = () => {
	const dispatch = useDispatch()
	const textToType = useSelector(state => state.typing.textToType)
	const inputValue = useSelector(state => state.typing.inputValue)
	const indexRef = useRef(0) // Используем ref для отслеживания текущего индекса

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
						dispatch(setFinished())
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

		// Добавляем обработчик события клавиатуры
		window.addEventListener('keydown', handleKeyDown)

		// Убираем обработчик при размонтировании компонента
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [dispatch, textToType, inputValue])

	return (
		<InputContainer>
			{textToType.split('').map((char, index) => {
				const inputChar = inputValue[index]
				const isError = inputChar !== undefined && inputChar !== char
				const isCorrect = inputChar === char

				return (
					<Character key={index} iserror={isError} iscorrect={isCorrect}>
						{char}
					</Character>
				)
			})}
		</InputContainer>
	)
}

export default TextInput
