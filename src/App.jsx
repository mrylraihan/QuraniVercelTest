import { useEffect, useRef, useState } from 'react'
import './App.css'
import QuranTest from './components/QuranTest'
import useSurahPicker from './hooks/useSurahPicker'
import AudioPlayer from './components/AudioPlayer'

function App() {
	const [data, setData] = useState({
		surahName: '',
		english: [''],
		arabic1: [''],
	})
	// const [audioPlayer, setAudioPlayer] = useState(true)
	const audioRef = useRef(null)
	const surahNumber = useSurahPicker()

	const handlePlay = () => {
		audioRef.current.play()
	}
	

	useEffect(() => {
		fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`)
			.then((res) => res.json())
			.then((result) => setData(result))
			.catch(console.error)
	}, [])
	return (
		<div>
			<QuranTest
				data={data}
				setData={setData}
				handlePlay={handlePlay}
				/>
				<AudioPlayer ref={audioRef}/>
			<div className='background-container'>
				<img
					src='https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
					alt='image on Masjid'
					className='background-image'
					/>
			</div>
		</div>
	)
}

export default App
