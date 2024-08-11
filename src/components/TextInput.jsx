import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	setInputValue,
	incrementErrors,
	setFinished,
} from '../redux/typingSlice'
import styled from 'styled-components'

const InputContainer = styled.div`
	border: 2px solid #ccc;
	padding: 10px;
	font-size: 24px;
	width: 100%;
`

const TextInput = () => {
	const dispatch = useDispatch()
	const textToType = useSelector(state => state.typing.textToType)
	const inputValue = useSelector(state => state.typing.inputValue)

	const handleInputChange = e => {
		const value = e.target.value
		dispatch(setInputValue(value))

		if (
			value.length > textToType.length ||
			value[value.length - 1] !== textToType[value.length - 1]
		) {
			dispatch(incrementErrors())
		}

		if (value.length === textToType.length) {
			dispatch(setFinished())
		}
	}

	return (
		<InputContainer>
			{textToType.split('').map((char, index) => {
				const inputChar = inputValue[index]
				return (
					<span
						key={index}
						style={{
							color:
								inputChar === char
									? 'green'
									: inputChar && inputChar !== char
									? 'red'
									: 'black',
						}}
					>
						{char}
					</span>
				)
			})}
			<input
				type='text'
				value={inputValue}
				onChange={handleInputChange}
				style={{ width: '100%', marginTop: '10px' }}
			/>
		</InputContainer>
	)
}

export default TextInput
