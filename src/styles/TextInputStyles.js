import styled, { css, keyframes } from 'styled-components'

// Анимация для мигания
const blink = keyframes`
  0% {
    color: red;
  }
  50% {
    color: transparent;
  }
  100% {
    color: red;
  }
`

// Стили контейнера ввода текста
const InputContainer = styled.div`
	position: relative;
	padding: 20px;
	font-size: 30px;
	font-weight: bold;
	width: 80%;
`
const anim = css`
	animation: ${blink} 0.5s linear;
`
// Стили для символов
const Character = styled.span`
	padding-left: 3px;
	color: ${props =>
		props.isError ? 'red' : props.isCorrect ? 'green' : '#8D8D8D'};
	animation: ${props => (props.isError ? anim : 'none')};
`

export { Character, InputContainer }
