import styled, { css, keyframes } from 'styled-components'

const anim = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`

const animTimer = css`
	animation: ${anim} 0.3s ease;
`

const TimerContainer = styled.div`
	position: absolute;
	top: -10%;
	${animTimer}
`

const TimerSpan = styled.span`
	font-size: 24px;
	color: #7a5f00;
`
export { TimerContainer, TimerSpan }
