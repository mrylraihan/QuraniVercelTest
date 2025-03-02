import { useState } from 'react'

function ThirdTry() {
	const [arrQuote, setData] = useState([])

	const getQuote = () => {
		fetch('https://api.kanye.rest/')
			.then((response) => response.json())
			.then((data) => setData(data.quote.trim().split(' ')))
			.catch(console.error)
	}

	return (
		<div>
			<h1>Third Try!</h1>
			{arrQuote.length > 0 && (
				<h2 className='text-3xl font-bold text-red-700'>
					{arrQuote.slice(0, arrQuote.length - 1).join(' ')}
					<span className='bg-red-1oo text-red-800 text-3xl font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-200 dark:text-red-800 ms-2'>
						{arrQuote[arrQuote.length - 1]}
					</span>
				</h2>
			)}
			<button onClick={getQuote}>Get New Quote</button>
		</div>
	)
}

export default ThirdTry
