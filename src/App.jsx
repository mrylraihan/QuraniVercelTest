import { useEffect, useRef, useState } from 'react'
import './App.css'
import QuranTest from './components/QuranTest'
import useSurahPicker from './hooks/useSurahPicker'

function App() {
	const [data, setData] = useState({ surahName: '', english: [''] })
	const audioRef = useRef(null)
	const surahNumber = useSurahPicker()

	const handlePlay = () => {
		audioRef.current.play()
	}
	
	useEffect(() => {
		
		fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`)
			.then((res) => res.json())
			.then((result) => setData(result))
			.then(()=>handlePlay())
			.catch(console.error)
	}, [])
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
			<div className='background-container'>
				<img src='/src/imgs/mosque1.jpg' alt='image on Masjid' className='background-image' />
			</div>
		</>
	)
}

export default App
