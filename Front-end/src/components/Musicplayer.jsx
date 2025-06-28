import './Allstyle.css'
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Removed: import './Allstyle.css'; // This import was causing resolution issues.
// Relying on Tailwind CSS for styling.

// MusicPlayer component now accepts initialSong and allSongs as props
const MusicPlayer = ({ initialSong = null, allSongs, setCurrentPlayingSong }) => {
  // Music Player States
  const [currentPlaying, setCurrentPlayingInternal] = useState(initialSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isPlayerVisible, setIsPlayerVisible] = useState(initialSong !== null); // Visible if an initial song is provided
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [totalAudioDuration, setTotalAudioDuration] = useState(0);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Initialize audioRef with a new Audio object
  const audioRef = useRef(new Audio());

  // Synchronize internal currentPlaying state with initialSong prop
  // This effect runs when initialSong changes, updating the player's internal state
  // and ensuring the audio element's source is updated.
  useEffect(() => {
    if (initialSong) {
      setCurrentPlayingInternal(initialSong);
      setIsPlayerVisible(true);
      const audio = audioRef.current;
      if (audio.src !== initialSong.audio) {
        audio.src = initialSong.audio;
        audio.load(); // Load the new track
        setCurrentAudioTime(0);
        setProgress(0);
        setIsAudioReady(false); // Reset ready state for new track
        // Attempt to play only if it's a new song, and let onCanPlayThrough handle it.
        // Or if it's the same song and was playing, resume playback
        if (isPlaying || (currentPlaying && currentPlaying.id === initialSong.id)) {
            audio.play().catch(e => console.error("Autoplay prevented on initial song change:", e));
        }
      }
    } else {
      setCurrentPlayingInternal(null);
      setIsPlayerVisible(false);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    }
  }, [initialSong]); // Depend on initialSong prop

  // Function to format time (e.g., 0:00)
  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Callback for handling time updates from the audio element
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) {
      setCurrentAudioTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  }, []);

  // Callback for when audio metadata is loaded AND ready to play
  const handleLoadedData = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      const duration = !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0
                       ? audio.duration
                       : 1;
      setTotalAudioDuration(duration);
      setIsAudioReady(true); // Signal that audio is loaded and ready
    } else {
      setTotalAudioDuration(0); // If no audio element, set to 0
      setIsAudioReady(false);
    }
  }, []);

  // Define playNextSong and playPreviousSong using useCallback
  const playNextSong = useCallback(() => {
    if (currentPlaying && allSongs && allSongs.length > 0) {
        const currentIndex = allSongs.findIndex(song => song.id === currentPlaying.id);
        const nextIndex = (currentIndex + 1) % allSongs.length;
        const nextSong = allSongs[nextIndex];
        // Update both internal state and parent's state
        setCurrentPlayingInternal(nextSong);
        if (setCurrentPlayingSong) { // Notify parent
            setCurrentPlayingSong(nextSong);
        }
        setIsPlaying(true); // Ensure play state is true for the next song
    }
  }, [currentPlaying, allSongs, setCurrentPlayingSong]);

  const playPreviousSong = useCallback(() => {
    if (currentPlaying && allSongs && allSongs.length > 0) {
        const currentIndex = allSongs.findIndex(song => song.id === currentPlaying.id);
        const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
        const prevSong = allSongs[prevIndex];
        // Update both internal state and parent's state
        setCurrentPlayingInternal(prevSong);
        if (setCurrentPlayingSong) { // Notify parent
            setCurrentPlayingSong(prevSong);
        }
        setIsPlaying(true); // Ensure play state is true for the previous song
    }
  }, [currentPlaying, allSongs, setCurrentPlayingSong]);

  // Callback for when audio ends (needs playNextSong as dependency)
  const handleAudioEnded = useCallback(() => {
    playNextSong();
  }, [playNextSong]);

  // Effect for setting up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedData = () => {
      const duration = !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 1;
      setTotalAudioDuration(duration);
      setIsAudioReady(true);
    };

    const onTimeUpdate = () => {
      setCurrentAudioTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const onEnded = () => {
      playNextSong();
    };

    const onCanPlayThrough = () => {
      setIsAudioReady(true);
      // Only attempt to play if the user has already initiated playback (isPlaying is true)
      // and the audio is currently paused (e.g., after loading a new track or seeking).
      if (isPlaying && audio.paused) {
        audio.play().catch(e => {
            console.error("Autoplay prevented on canplaythrough:", e);
            setIsPlaying(false); // If autoplay fails, update state to reflect
        });
      }
    };

    const onError = (e) => {
      console.error("Audio Error:", e);
      // You might want to display a user-friendly message here
      setIsPlaying(false); // Ensure playback state is false if an error occurs
    };

    audio.addEventListener('loadeddata', onLoadedData);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('canplaythrough', onCanPlayThrough);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadeddata', onLoadedData);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('canplayThrough', onCanPlayThrough);
      audio.removeEventListener('error', onError);
    };
  }, [isPlaying, playNextSong]); // Dependencies: isPlaying (for canplaythrough logic), playNextSong

  // Effect for handling volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  // Function to toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => {
        console.error("Playback error on toggle:", e);
        setIsPlaying(false); // If play fails (e.g., autoplay policy), ensure state reflects it
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Function to handle seek/progress bar
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);
    if (audio && !isNaN(totalAudioDuration) && totalAudioDuration > 0) {
        audio.currentTime = newTime;
        setCurrentAudioTime(newTime);
        setProgress((newTime / totalAudioDuration) * 100);
    }
  };

  // Function to handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Function to toggle player visibility
  const togglePlayerVisibility = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };

  // Function to get volume icon
  const getVolumeIcon = (currentVolume) => {
    if (currentVolume === 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.067A1 1 0 0110 3.998v12a1 1 0 01-1.707.708L4 12.414H2a1 1 0 01-1-1v-2a1 1 0 011-1h2L8.293 3.293a1 1 0 011.09-.226zM14.75 7.25a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V7.25z" clipRule="evenodd" />
        </svg>
      );
    } else if (currentVolume < 0.5) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.067A1 1 0 0110 3.998v12a1 1 0 01-1.707.708L4 12.414H2a1 1 0 01-1-1v-2a1 1 0 011-1h2L8.293 3.293a1 1 0 011.09-.226zM15.586 10l.707-.707a1 1 0 00-1.414-1.414L14 8.586l-.707-.707a1 1 0 00-1.414 1.414L12.586 10l-.707.707a1 1 0 001.414 1.414L14 11.414l.707.707a1 1 0 001.414-1.414L15.586 10z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.067A1 1 0 0110 3.998v12a1 1 0 01-1.707.708L4 12.414H2a1 1 0 01-1-1v-2a1 1 0 011-1h2L8.293 3.293a1 1 0 011.09-.226zM16 8a1 1 0 011 1v2a1 1 0 01-1 1h-.01a1 1 0 01-.707-.293l-.707-.707a1 1 0 010-1.414l.707-.707A1 1 0 0115 8h1zM14 6a1 1 0 011 1v6a1 1 0 01-2 0V7a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  return (
    // Music Player (Smaller Design)
    currentPlaying && (
        <div className={`fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 py-3 px-4 flex flex-col md:flex-row items-center justify-center shadow-2xl z-50 transition-transform duration-300 transform ${isPlayerVisible ? 'translate-y-0' : 'translate-y-full'} rounded-t-xl`}>
            {/* The audio element for playback */}
            <audio ref={audioRef} />

            {/* Album Art and Song Info */}
            <div className="flex items-center space-x-3 mb-2 md:mb-0 md:w-1/4 flex-shrink-0">
                <div className="relative group w-16 h-16 flex-shrink-0">
                    <img
                        src={currentPlaying.albumArt || "https://placehold.co/100x100/333333/FFFFFF?text=Music"}
                        alt={currentPlaying.title}
                        className="w-full h-full object-cover rounded-md shadow-md border border-gray-700 transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                    <h4 className="text-lg font-bold text-white truncate">{currentPlaying.title}</h4>
                    <p className="text-sm text-gray-300 truncate">{currentPlaying.artist}</p>
                </div>
            </div>

            {/* Playback Controls and Seek Bar */}
            <div className="flex flex-col items-center flex-grow mx-4 w-full md:w-1/2">
                <div className="flex items-center space-x-3 mb-2">
                    <button onClick={playPreviousSong} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-gray-800 active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14V5" />
                        </svg>
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 active:scale-90 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.456A1 1 0 008 8.3v3.4a1 1 0 001.555.844l3.945-1.972a1 1 0 000-1.688L9.555 7.456z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                    <button onClick={playNextSong} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-gray-800 active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5v14" />
                        </svg>
                    </button>
                </div>
                <input
                    type="range"
                    min="0"
                    max={totalAudioDuration}
                    value={currentAudioTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-red-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1 w-full">
                    <span>{formatTime(currentAudioTime)}</span>
                    <span>{formatTime(totalAudioDuration)}</span>
                </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 md:ml-4 mt-4 md:mt-0 md:w-1/4 justify-end flex-shrink-0">
                <span className="text-gray-400">
                    {getVolumeIcon(volume)}
                </span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm accent-red-500"
                />
            </div>

            {/* Arrow button to hide/show player */}
            <button
                onClick={togglePlayerVisibility}
                className="absolute -top-6 right-4 bg-gray-900 text-gray-400 p-1 rounded-t-lg hover:text-red-500 hover:bg-gray-800 transition-colors duration-200 focus:outline-none z-50"
            >
                {isPlayerVisible ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </div>
    )
  );
};

export default MusicPlayer;
