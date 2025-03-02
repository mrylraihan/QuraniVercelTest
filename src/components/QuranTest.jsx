import useSurahPicker from '../hooks/useSurahPicker'

function QuranTest({ data, setData, handlePlay }) {
	const surahNumber = useSurahPicker()
	const verseNumber = useSurahPicker(1, data.english.length - 1)
	const getQuote = () => {
		handlePlay()
		fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`)
			.then((res) => res.json())
			.then((result) => setData(result))
			.catch()
	}

	console.log(data)
	return (
		<div onClick={getQuote}>
			{
				<div>
					<h2 className='text-2xl font-bold text-red-300 text-opacity-50'>
						Surah Name: {data.surahName}
						<span className='bg-red-1oo text-red-800 text-3xl font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-200 dark:text-red-800 ms-2'>
							| {data.surahNo}
						</span>
					</h2>
					<h2 className='text-3xl font-bold text-gray-300 text-opacity-50'>
						{data.english[verseNumber]}
					</h2>
				</div>
			}

			{/* <button onClick={getQuote}>Click me</button> */}
		</div>
	)
}

export default QuranTest

{
	/* <div>
				{data.length > 0 ? (
					<audio controls>
						<source src={data[0].audio} type='audio/mpeg' />
						Your browser does not support the audio element.
					</audio>
				) : (
					<p>Loading...</p>
				)}
			</div> */
}
