import styled, { keyframes, css } from 'styled-components'

const gradient = keyframes`
  0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`

const animBg = css`
	animation: ${gradient} 15s ease infinite;
`

const AppContainer = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 100vh; /* Высота для полного экрана */
	color: #fdd300e0;

	flex-direction: column;
	align-items: center;
	justify-content: center;
	// background: linear-gradient(-45deg, #3c3c3c, #2c2c2c, #313131, #1e1e1e);
	// background-size: 400% 400%;
	// ${animBg};
	// overflow: hidden;
`

export { AppContainer }
