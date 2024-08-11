import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../redux/typingSlice'
import styled from 'styled-components'

const ResultsContainer = styled.div`
	margin-top: 20px;
`

const Results = () => {
	const dispatch = useDispatch()
	const errors = useSelector(state => state.typing.errors)
	const wpm = useSelector(state => state.typing.wpm)

	return (
		<ResultsContainer>
			<h2>Результаты</h2>
			<p>Ошибки: {errors}</p>
			<p>Скорость печати (WPM): {wpm}</p>
			<button onClick={() => dispatch(reset())}>
				Перезапустить упражнение
			</button>
		</ResultsContainer>
	)
}

export default Results
