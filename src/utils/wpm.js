/*
 Функция для подсчета количества слов в минуту (WPM - Words Per Minute).
 
 Параметры:
 - text: строка текста, для которой нужно вычислить WPM.
 - elapsedTimeInSeconds: время, затраченное на чтение текста, в секундах.

 Возвращает:
 - Число, представляющее количество слов в минуту, округленное до двух знаков после запятой.
*/

function measureWPM(text, elapsedTimeInSeconds) {
	// Удаляем лишние пробелы в начале и в конце строки и делим текст на массив слов по пробелу.
	const words = text.trim().split(/\s+/).length; // считаем количество слов.
	
	// Преобразуем время выполнения в минуты.
	const minutes = elapsedTimeInSeconds / 60; // преобразуем время в минуты.
	
	// Вычисляем количество слов в минуту.
	const wpm = words / minutes; // вычисляем WPM.
	
	// Округляем результат до двух знаков после запятой и возвращаем его.
	return wpm.toFixed(2); // возвращаем значение WPM.
}

// Экспортируем функцию для использования в других модулях.
export { measureWPM };
