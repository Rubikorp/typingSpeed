import React from 'react'

import { faRotateBack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Btn, BtnContainer } from '../styles/TextInputStyles'

import { randomText } from '../utils/textSamples'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../redux/typingSlice'

import { ResultsContainer } from '../styles/ResultStyles'

const Results = () => {
	const dispatch = useDispatch()
	const errors = useSelector(state => state.typing.errors)
	const wpm = useSelector(state => state.typing.wpm)

	return (
		<ResultsContainer>
			<h2>Результаты</h2>
			<p>Ошибки: {errors}</p>
			<p>Скорость печати (WPM): {wpm}</p>
			<BtnContainer>
				<Btn onClick={() => dispatch(reset(randomText()))} autoFocus='none'>
					<FontAwesomeIcon icon={faRotateBack} />
				</Btn>
			</BtnContainer>
		</ResultsContainer>
	)
}

export default Results
