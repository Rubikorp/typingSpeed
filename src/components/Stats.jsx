import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StatsContainer = styled.div`
	margin-top: 20px;
`

const Stats = () => {
	const errors = useSelector(state => state.typing.errors)
	const wpm = useSelector(state => state.typing.wpm)

	return (
		<StatsContainer>
			<p>Ошибки: {errors}</p>
			<p>Скорость печати (WPM): {wpm}</p>
		</StatsContainer>
	)
}

export default Stats
