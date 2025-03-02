import { useEffect, useRef, useState } from 'react'
import './App.css'
import QuranTest from './components/QuranTest'
import useSurahPicker from './hooks/useSurahPicker'

function App() {
	const [data, setData] = useState({ surahName: '', english: [''] })
	const audioRef = useRef(null)
	const surahNumber = useSurahPicker()
		useEffect(() => {
			fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`)
				.then((res) => res.json())
				.then((result) => setData(result))
				.catch(console.error)
		}, [])
		 const handlePlay = () => {
				audioRef.current.play()
			}
	return (
		<>
			<audio autoPlay ref={audioRef}>
				<source
					src={'https://server8.mp3quran.net/afs/075.mp3'}
					type='audio/mpeg'
				/>
				Your browser does not support the audio element.
			</audio>
			<QuranTest data={data} setData={setData} handlePlay={handlePlay} />
		</>
	)
}

export default App
