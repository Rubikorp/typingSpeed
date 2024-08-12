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

const cursorBlink = keyframes`
  0% {
    opacity: 0;
  }
		50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
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

const cursor = css`
	&:after {
		content: '|';
		height: 100%;
		position: absolute;
		left: -2px;
		color: yellow;
		animation: ${cursorBlink} 1s ease-in-out infinite;
	}
`
// Стили для символов
const Character = styled.span`
	position: relative;
	padding-left: 3px;
	color: ${({ isError, isCorrect }) =>
		isError ? 'red' : isCorrect ? 'green' : '#8D8D8D'};
	animation: ${({ isError }) => (isError ? anim : 'none')};
	${({ isChar }) => (isChar ? cursor : '')}
`

const BtnContainer = styled.div`
	margin-top: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Btn = styled.button`
 background: none;
 padding none;
 border: none;
 color: #F9A200;
 cursor: pointer;
 svg {
	height: 30px;
  width: 30px;
 }
`

export { Character, InputContainer, BtnContainer, Btn }
