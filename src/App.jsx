import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setTextToType } from './redux/typingSlice'
import { randomText } from './utils/textSamples'
import TextInput from './components/TextInput'
import Stats from './components/Stats'
import Results from './components/Results'
import styled from 'styled-components'

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setTextToType(randomText()))
	}, [dispatch])

	return (
		<AppContainer>
			<h1>Typing Speed Trainer</h1>
			<TextInput />
			<Stats />
			<Results />
		</AppContainer>
	)
}

export default App
