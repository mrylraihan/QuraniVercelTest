import { useState, useEffect, forwardRef } from 'react'

const AudioPlayer = forwardRef((props, ref)=>{
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (ref.current) {
        const percentage = (ref.current.currentTime / ref.current.duration) * 100;
        setProgress(percentage);
      }
    };

    if (ref.current) {
      ref.current.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopAudio = () => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
		<div className='flex flex-col items-center space-y-3 p-3'>
			<audio ref={ref} src='https://server8.mp3quran.net/afs/075.mp3' />
			<div className='flex items-center space-x-2'>
				<button
					onClick={togglePlayPause}
					className='px-4 py-2 bg-red-300 text-white rounded hover:bg-red-300 focus:outline-none'>
					{isPlaying ? '⏸️' : '▶️'}
				</button>
				<button
					onClick={stopAudio}
					className='px-4 py-2 bg-red-300 text-white rounded hover:bg-red-300 focus:outline-none'>
					⏹️
				</button>
			</div>
			<div className='w-2xs bg-gray-200 rounded-full h-2'>
				<div
					className='bg-red-300 h-2 rounded-full'
					style={{ width: `${progress}%` }}></div>
			</div>
			<input
				type='range'
				min='0'
				max='1'
				step='0.01'
				onChange={(e) => (ref.current.volume = e.target.value)}
				className='w-24 text-red-300'
			/>
		</div>
	)
})

export default AudioPlayer;