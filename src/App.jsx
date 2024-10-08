import React, { useEffect } from 'react'

/* redux */
import { useDispatch, useSelector } from 'react-redux'
import { setTextToType } from './redux/typingSlice'
import { randomText } from './utils/textSamples'

/* styles */
import { AppContainer } from './styles/AppStyles'

/* components */
import TextInput from './components/TextInput'
import Results from './components/Results'

const App = () => {
	const dispatch = useDispatch()
	const finished = useSelector(state => state.typing.finished)

	useEffect(() => {
		dispatch(setTextToType(randomText()))
	}, [dispatch])

	return (
		<AppContainer>
			<h1>ТРЕНАЖЕР СКОРОСТИ ПЕЧАТИ</h1>
			{finished ? <Results /> : <TextInput />}
		</AppContainer>
	)
}

export default App
