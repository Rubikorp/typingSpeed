import React, { createContext, useState, useEffect } from 'react';
import { textSamples } from '../utils/textSamples';

// Создаем контекст для управления состоянием
export const TypingContext = createContext();

export const TypingProvider = ({ children }) => {
  const [textToType, setTextToType] = useState(textSamples[0]);
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [finished, setFinished] = useState(false);

  // Эффект для обработки времени печати и завершения
  useEffect(() => {
    if (inputValue.length === textToType.length && inputValue.length > 0) {
      setFinished(true);
      setStartTime(null);
    } else if (inputValue.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    const interval = setInterval(() => {
      if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 60000; // Переводим в минуты
        setWpm(Math.round((inputValue.split(' ').length / timeElapsed) || 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [inputValue, startTime, textToType]);

  // Обработчик ввода текста
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Подсчет ошибок
    if (value.length > textToType.length || value[value.length - 1] !== textToType[value.length - 1]) {
      setErrors((prev) => prev + 1);
    }
  };

  // Функция для сброса состояния
  const reset = () => {
    setInputValue('');
    setErrors(0);
    setStartTime(null);
    setWpm(0);
    setFinished(false);
    setTextToType(textSamples[Math.floor(Math.random() * textSamples.length)]);
  };

  return (
    <TypingContext.Provider value={{
      textToType,
      inputValue,
      errors,
      wpm,
      finished,
      handleInputChange,
      reset,
    }}>
      {children}
    </TypingContext.Provider>
  );
};