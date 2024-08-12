function measureWPM(text, elapsedTimeInSeconds) {
	const words = text.trim().split(/\s+/).length // считаем количество слов
	const minutes = elapsedTimeInSeconds / 60 // преобразуем время в минуты
	const wpm = words / minutes // вычисляем WPM
	return wpm
}

export { measureWPM }
