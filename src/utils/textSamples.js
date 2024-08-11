const textSamples = [
	'The quick brown fox jumps over the lazy dog.',
	'A journey of a thousand miles begins with a single step.',
	'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
	// больше строк по желанию
]

const randomText = () => {
	let text = textSamples[Math.floor(Math.random() * textSamples.length)]
	return text
}

export { randomText }
