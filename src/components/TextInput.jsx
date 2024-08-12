import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Character,
	InputContainer,
	BtnContainer,
	Btn,
} from '../styles/TextInputStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateBack, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { randomText } from '../utils/textSamples'
import { updateWPM } from '../redux/typingSlice'
import { measureWPM } from '../utils/wpm'
import CountdownTimer from './Timer'
import {
	incrementErrors,
	setFinished,
	setInputValue,
	setStartTime,
	reset,
} from '../redux/typingSlice'

const TextInput = () => {
	const dispatch = useDispatch()
	const startTime = useSelector(state => state.typing.startTime)
	const textToType = useSelector(state => state.typing.textToType)
	const inputValue = useSelector(state => state.typing.inputValue)
	const indexRef = useRef(0) // Используем ref для отслеживания текущего индекса

	const [charIndex, setCharIndex] = useState(null)

	// при сбросе сбрасывает ref
	useEffect(() => {
		indexRef.current = 0
		setCharIndex(null)
	}, [textToType])

	// Эффект для отслеживания нажатий клавиш
	useEffect(() => {
		const handleKeyDown = event => {
			const key = event.key

			// Проверяем, является ли нажатая клавиша символом для ввода
			if (key.length === 1) {
				const currentChar = textToType[indexRef.current]

				// Обрабатываем правильный ввод и ошибки
				if (key === currentChar) {
					dispatch(setInputValue(inputValue + key))
					indexRef.current += 1
					setCharIndex(indexRef.current)
				} else {
					// Увеличиваем количество ошибок только если символ не был добавлен ранее
					if (!inputValue.endsWith(key)) {
						dispatch(setInputValue(inputValue + key))
						dispatch(incrementErrors())
						indexRef.current += 1
						setCharIndex(indexRef.current)
					}
				}
			} else if (key === 'Backspace') {
				// Обрабатываем удаление символа
				dispatch(setInputValue(inputValue.slice(0, -1)))
				if (indexRef.current > 0) {
					indexRef.current -= 1
					setCharIndex(indexRef.current)
				} // Уменьшаем индекс при удалении
			}
		}

		// Проверяем, завершен ли ввод
		if (inputValue.length === textToType.length && inputValue) {
			dispatch(updateWPM(measureWPM(inputValue, startTime)))
			dispatch(setFinished())
		}

		if (inputValue.length === 1) {
			dispatch(setStartTime(30))
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

				const combinedProps = {
					isError: isError,
					isCorrect: isCorrect,
					isChar: charIndex === index,
				}

				return (
					<Character key={index} {...combinedProps}>
						{char}
					</Character>
				)
			})}
			<BtnContainer>
				<Btn>
					<FontAwesomeIcon
						icon={faRotateBack}
						onClick={() => dispatch(reset(randomText()))}
						className='fa-beat-fade'
					/>
				</Btn>
			</BtnContainer>
		</InputContainer>
	)
}

export default TextInput
