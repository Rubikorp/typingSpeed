import styled, { keyframes, css } from 'styled-components'

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
	border: 2px solid #ccc;
	padding: 10px;
	font-size: 24px;
	width: 100%;
`
const anim = css`
	animation: ${blink} 0.5s linear;
`
// Стили для символов
const Character = styled.span`
	color: ${props =>
		props.iserror ? 'red' : props.iscorrect ? 'green' : 'black'};
	animation: ${props => (props.iserror ? anim : 'none')};
`
export { InputContainer, Character }
