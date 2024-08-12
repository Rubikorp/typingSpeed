import React, { useState, useEffect } from 'react'

/* redux */
import { useDispatch, useSelector } from 'react-redux'
import { setFinished, setStartTime } from '../redux/typingSlice'
import { updateWPM } from '../redux/typingSlice'
import { TimerContainer, TimerSpan } from '../styles/TimerStyles'

/* utils */
import { measureWPM } from '../utils/wpm'

const CountdownTimer = () => {
	const startTime = useSelector(state => state.typing.startTime)
	const inputValue = useSelector(state => state.typing.inputValue)
	const finished = useSelector(state => state.typing.finished)

	const dispatch = useDispatch()

	const [timeLeft, setTimeLeft] = useState(30)

	useEffect(() => {
		if (startTime) {
			// Проверяем, если время закончилось
			if (timeLeft <= 0) return

			// Устанавливаем интервал для обновления времени каждую секунду
			const interval = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime > 1) {
						dispatch(setStartTime(prevTime - 1))
						return prevTime - 1 // Уменьшаем на 1 секунду
					} else {
						// в случае сброса сбрасываем таймер
						if (startTime === null) {
							clearInterval(interval)
							return 0
						}
						clearInterval(interval)
						dispatch(updateWPM(measureWPM(inputValue, 30)))
						dispatch(setFinished())
						return 0 // Завершаем таймер
					}
				})
			}, 1000)

			// Очищаем интервал при размонтировании компонента или изменении времени
			return () => clearInterval(interval)
		}
	}, [timeLeft, finished])
	return (
		<TimerContainer>
			<TimerSpan> {timeLeft > 0 ? timeLeft : ''}</TimerSpan>
		</TimerContainer>
	)
}

export default CountdownTimer
