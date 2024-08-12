import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TimerContainer, TimerSpan } from '../styles/TimerStyles'

const CountdownTimer = () => {
	const startTime = useSelector(state => state.typing.startTime)
	const [timeLeft, setTimeLeft] = useState(30)
	useEffect(() => {
		setTimeLeft(startTime)
	}, [startTime])

	useEffect(() => {
		if (startTime) {
			// Проверяем, если время закончилось
			if (timeLeft <= 0) return

			// Устанавливаем интервал для обновления времени каждую секунду
			const interval = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime > 1) {
						return prevTime - 1 // Уменьшаем на 1 секунду
					} else {
						if (startTime === null) {
							clearInterval(interval)
							return 0
						}
						clearInterval(interval)
						return 0 // Завершаем таймер
					}
				})
			}, 1000)

			// Очищаем интервал при размонтировании компонента или изменении времени
			return () => clearInterval(interval)
		}
	}, [timeLeft])
	return (
		<TimerContainer>
			<TimerSpan> {timeLeft > 0 ? timeLeft : ''}</TimerSpan>
		</TimerContainer>
	)
}

export default CountdownTimer
