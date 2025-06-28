import './Allstyle.css'
import vannda from '../assets/vannDa.mp3'
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Dummy Data (Expanded for different sections) ---
const allSongs = [
  // IMPORTANT: For local MP3 files, ensure they are correctly placed in your project's `public` or `assets` folder
  // and referenced via their public URL (e.g., '/assets/vannDa.mp3') or imported if your bundler supports it.
  // In this live environment, local file imports might not resolve, so using a public URL for demonstration.
  { id: 1, title: 'សុវណ្ណភូមិ (GOLDEN LAND)', artist: 'VANNDA', album: 'treyvisai_iii_return_to_sovannaphum', albumArt: 'https://placehold.co/150x150/007bff/ffffff?text=Starlight', audio: vannda , genre: 'Hip-hop', views: '15M' },
];

const allArtists = [
    { id: 'artist-1', name: "SUNNYPRETTY", genre: "Pop", profileImage: "https://placehold.co/200x200/ef4444/FFFFFF?text=SUNNYPRETTY", coverImage: "https://placehold.co/1200x400/333333/FFFFFF?text=SUNNYPRETTY+Banner", bio: "SUNNYPRETTY is a rising pop sensation known for their vibrant melodies and heartfelt lyrics. Their music often blends traditional sounds with modern electronic elements, creating a unique and captivating experience." },
    { id: 'artist-2', name: "N/EA KING", genre: "Pop", profileImage: "https://placehold.co/200x200/007bff/ffffff?text=N/EA+KING", coverImage: "https://placehold.co/1200x400/444444/DDDDDD?text=N/EA+KING+Banner", bio: "N/EA KING brings a fresh perspective to pop music with their powerful vocals and innovative production. Their tracks are often inspired by traditional Cambodian music, giving them a distinct and soulful sound." },
    { id: 'artist-3', name: "VannDa", genre: "Hip-hop", profileImage: "https://placehold.co/200x200/28a745/ffffff?text=VannDa", coverImage: "https://placehold.co/1200x400/555555/EEEEEE?text=VannDa+Banner", bio: "VannDa is a prominent figure in the Cambodian hip-hop scene, known for his sharp lyrical prowess and compelling storytelling. His music addresses contemporary social issues and captivates audiences with its raw energy." },
    { id: 'artist-4', name: "kmengkhmer", genre: "Pop", profileImage: "https://placehold.co/200x200/dc3545/ffffff?text=kmengkhmer", coverImage: "https://placehold.co/1200x400/666666/DDDDDD?text=kmengkhmer+Banner", bio: "kmengkhmer is a dynamic pop group blending catchy tunes with energetic performances. Their music resonates with a wide audience, making them one of the most popular acts in the region." },
    { id: 'artist-5', name: "4TS", genre: "Electronic", profileImage: "https://placehold.co/200x200/ffc107/ffffff?text=4TS", coverImage: "https://placehold.co/1200x400/777777/AAAAAA?text=4TS+Banner", bio: "4TS is an electronic music producer known for their experimental soundscapes and intricate beats. Their work often explores the boundaries of electronic music, creating unique auditory experiences." },
    { id: 'artist-6', name: "宮下遊", genre: "J-Pop", profileImage: "https://placehold.co/200x200/6a0dad/ffffff?text=Miyashita+Yu", coverImage: "https://placehold.co/1200x400/888888/BBBBBB?text=Miyashita+Yu+Banner", bio: "宮下遊 (Miyashita Yu) is a renowned Japanese artist with a distinctive vocal style and a knack for creating emotionally rich J-pop tracks. Their music often features lush arrangements and evocative lyrics." },
    { id: 'artist-7', name: "Soul Snatcher", genre: "Hip-hop", profileImage: "https://placehold.co/200x200/e91e63/ffffff?text=Soul+Snatcher", coverImage: "https://placehold.co/1200x400/999999/CCCCCC?text=Soul+Snatcher+Banner", bio: "Soul Snatcher delivers powerful hip-hop anthems with sharp social commentary and a commanding presence. Their music is known for its impactful beats and thought-provoking lyrics." },
    { id: 'artist-8', name: "RXTHA", genre: "Pop", profileImage: "https://placehold.co/200x200/00bcd4/ffffff?text=RXTHA", coverImage: "https://placehold.co/1200x400/AAAAAA/DDDDDD?text=RXTHA+Banner", bio: "RXTHA is a versatile pop artist, effortlessly blending various genres to create fresh and exciting music. Their dynamic vocal range and captivating stage presence have garnered a loyal fanbase." },
    { id: 'artist-9', name: "PressSAMA", genre: "Hip-hop", profileImage: "https://placehold.co/200x200/ff5722/ffffff?text=PressSAMA", coverImage: "https://placehold.co/1200x400/BBBBBB/EEEEEE?text=PressSAMA+Banner", bio: "PressSAMA is an emerging hip-hop artist known for their raw talent and compelling narratives. Their music reflects authentic experiences, resonating with listeners through its honesty and intensity." },
    { id: 'artist-10', name: "KWANN", genre: "Pop", profileImage: "https://placehold.co/200x200/9c27b0/ffffff?text=KWANN", coverImage: "https://placehold.co/1200x400/CCCCCC/FFFFFF?text=KWANN+Banner", bio: "KWANN is a celebrated pop artist, recognized for their unique vocal color and chart-topping hits. Their music often explores themes of love and self-discovery, connecting deeply with fans worldwide." },
];

const allAlbums = [
    { id: 'album-1', title: 'Skull the Album', artist: 'VannDa', albumArt: 'https://placehold.co/150x150/212121/ffffff?text=Skull+Album', releaseDate: '2023-01-01' },
    { id: 'album-2', title: 'SONMALAI MIXTAPE', artist: 'KWANN', albumArt: 'https://placehold.co/150x150/313131/ffffff?text=SONMALAI', releaseDate: '2023-03-15' },
    { id: 'album-3', title: 'V.R.17', artist: 'kmengkhmer', albumArt: 'https://placehold.co/150x150/414141/ffffff?text=V.R.17', releaseDate: '2023-05-20' },
    { id: 'album-4', title: 'Cartel Meeting Vol.2', artist: 'Cartel', albumArt: 'https://placehold.co/150x150/515151/ffffff?text=Cartel+Vol2', releaseDate: '2023-07-10' },
    { id: 'album-5', title: 'ME (feat. RuthKo)', artist: 'N/EA KING', albumArt: 'https://placehold.co/150x150/616161/ffffff?text=ME+Album', releaseDate: '2023-09-01' },
    { id: 'album-6', title: 'Night Drive', artist: '4TS', albumArt: 'https://placehold.co/150x150/717171/ffffff?text=Night+Drive', releaseDate: '2023-11-25' },
    { id: 'album-7', title: 'Echoes of Eternity', artist: 'Aurora Bloom', albumArt: "https://placehold.co/150x150/1a1a1a/e0e0e0?text=Album+1", releaseDate: "2023-01-15" },
    { id: 'album-8', title: "Celestial Harmonies", artist: "Aurora Bloom", albumArt: "https://placehold.co/150x150/7b7b7b/e0e0e0?text=Album+A7", releaseDate: "2024-03-10" },
];

const allRadios = [
    { id: 'radio-1', title: 'kmengkhmer Radio', artist: 'kmengkhmer', image: 'https://placehold.co/150x150/333333/ffffff?text=kmengkhmer+Radio' },
    { id: 'radio-2', title: 'Keo Veasna Radio', artist: 'Keo Veasna', image: 'https://placehold.co/150x150/444444/ffffff?text=Keo+Radio' },
    { id: 'radio-3', title: 'Tena Radio', artist: 'Tena', image: 'https://placehold.co/150x150/555555/ffffff?text=Tena+Radio' },
    { id: 'radio-4', title: 'Tep Piseth Radio', artist: 'Tep Piseth', image: 'https://placehold.co/150x150/666666/ffffff?text=Tep+Radio' },
    { id: 'radio-5', title: 'Sokun Nisa Radio', artist: 'Sokun Nisa', image: 'https://placehold.co/150x150/777777/ffffff?text=Nisa+Radio' },
    { id: 'radio-6', title: 'Preap Sovath Radio', artist: 'Preap Sovath', image: 'https://placehold.co/150x150/888888/ffffff?text=Sovath+Radio' },
];

// Dummy data for playlists
const playlists = [
    { id: 1, title: "Chill Vibes", description: "Relaxing tunes for unwinding", cover: "https://placehold.co/300x300/5a2d6e/FFFFFF?text=Playlist+1" },
    { id: 2, title: "Workout Mix", description: "High-energy tracks for your routine", cover: "https://placehold.co/300x300/8a3f2b/FFFFFF?text=Playlist+2" },
    { id: 3, title: "Focus Mode", description: "Instrumental music for concentration", cover: "https://placehold.co/300x300/2b6e5a/FFFFFF?text=Playlist+3" },
    { id: 4, title: "Road Trip Anthems", description: "Sing along to these classics", cover: "https://placehold.co/300x300/6e5a2d/FFFFFF?text=Playlist+4" },
    { id: 5, title: "Morning Jams", description: "Start your day with good music", cover: "https://placehold.co/300x300/2d6e6e/FFFFFF?text=Playlist+5" },
    { id: 6, title: "Evening Acoustic", description: "Soft and soulful melodies", cover: "https://placehold.co/300x300/6e2d4f/FFFFFF?text=Playlist+6" },
];


// --- Reusable Components (These will still have their internal animations) ---

// Horizontal scroll container component
const HorizontalScrollContainer = ({ children, title, linkText, onLinkClick, id, className = '' }) => (
    <section className={`mb-8 md:mb-12 opacity-0 animate-fadeInUp animation-delay-100 ${className}`} id={id}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white pl-2 drop-shadow">{title}</h2>
            {linkText && (
                <button
                    onClick={onLinkClick}
                    className="text-red-400 hover:text-red-500 text-sm font-semibold transition-colors duration-200 pr-2"
                >
                    {linkText}
                </button>
            )}
        </div>
        <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 horizontal-scroll-container">
            {children}
        </div>
    </section>
);

// Genre Button component (Removed from actual usage as per request, but kept for reference if needed elsewhere)
const GenreButton = ({ genre, onClick, className = '' }) => (
    <button
        onClick={() => onClick(genre)}
        className={`px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-full transition-colors duration-200 shadow-md flex-shrink-0
                    focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
    >
        {genre}
    </button>
);

// Card for content items (song, album, artist, radio)
const ContentCard = ({ item, type, onClick, index = 0, showHoverOverlay = true }) => {
    let imageUrl = item.albumArt || item.profileImage || item.image || 'https://placehold.co/150x150/6c757d/ffffff?text=No+Art';
    let title = item.title || item.name;
    let subtitle = item.artist || item.genre || '';
    let extraInfo = item.views || item.releaseDate;

    // Conditionally apply the hover class for the overlay
    const hoverOverlayClass = showHoverOverlay ? 'group-hover:opacity-100' : '';

    return (
        <div
            className={`group flex-shrink-0 w-40 sm:w-48 bg-gray-900 p-3 rounded-xl shadow-xl border border-gray-800
                       transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                       transition-all duration-300 cursor-pointer relative overflow-hidden
                       opacity-0 animate-fadeInUp animation-delay-${(index + 1) * 100}`}
            onClick={() => onClick(item, type)}
        >
            <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden mb-3 shadow-lg">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/6c757d/ffffff?text=No+Art'; }}
                />
                {/* Play button overlay - now conditionally controlled by showHoverOverlay */}
                <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300 ${hoverOverlayClass}`}>
                    <button className="p-3 bg-red-600 rounded-full text-white shadow-lg hover:bg-red-700 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.456A1 1 0 008 8.3v3.4a1 1 0 001.555.844l3.945-1.972a1 1 0 000-1.688L9.555 7.456z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <h3 className="text-base font-semibold text-white mb-0.5 truncate">{title}</h3>
            <p className="text-xs text-gray-400 truncate">{subtitle}</p>
            {extraInfo && <p className="text-xs text-gray-500 mt-1">{extraInfo}</p>}
        </div>
    );
};


// Main App Component
const Musicpage = () => {
  // State for managing view
  const [currentView, setCurrentView] = useState('home');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Music Player States
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [totalAudioDuration, setTotalAudioDuration] = useState(0);
  const [isAudioReady, setIsAudioReady] = useState(false); // New state to track if audio is ready to play

  const audioRef = useRef(null);

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
    // Update state from audio events directly
    if (audio && !isNaN(audio.duration) && audio.duration > 0) {
      setCurrentAudioTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  }, []); // No dependencies for this simple direct update


  // Callback for when audio metadata is loaded AND ready to play
  const handleLoadedData = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      console.log('Audio loadeddata event fired. audio.duration:', audio.duration);
      // Ensure audio.duration is a finite number and greater than 0
      const duration = !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0
                       ? audio.duration
                       : 1; // Default to 1 second to ensure slider is interactive even for 0-duration
      setTotalAudioDuration(duration);
      setIsAudioReady(true); // Signal that audio is loaded and ready
    } else {
      setTotalAudioDuration(0); // If no audio element, set to 0
      setIsAudioReady(false);
    }
  }, []);


  // Define playNextSong and playPreviousSong using useCallback
  const playNextSong = useCallback(() => {
    if (currentPlaying) {
        const playableSongs = allSongs; // Or filter based on current view/album
        const currentIndex = playableSongs.findIndex(song => song.id === currentPlaying.id);
        const nextIndex = (currentIndex + 1) % playableSongs.length;
        setCurrentPlaying(playableSongs[nextIndex]);
        setIsPlaying(true); // Ensure play state is true for the next song
    }
  }, [currentPlaying, allSongs]); // Depend on currentPlaying and allSongs

  const playPreviousSong = useCallback(() => {
    if (currentPlaying) {
        const playableSongs = allSongs; // Or filter based on current view/album
        const currentIndex = playableSongs.findIndex(song => song.id === currentPlaying.id);
        const prevIndex = (currentIndex - 1 + playableSongs.length) % playableSongs.length;
        setCurrentPlaying(playableSongs[prevIndex]);
        setIsPlaying(true); // Ensure play state is true for the previous song
    }
  }, [currentPlaying, allSongs]); // Depend on currentPlaying and allSongs

  // Callback for when audio ends (needs playNextSong as dependency)
  const handleAudioEnded = useCallback(() => {
    playNextSong();
  }, [playNextSong]);


  // Effect for global styles (runs once on mount)
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            box-sizing: border-box !important;
            scroll-behavior: smooth;
        }
        #root {
            width: 100% !important;
            height: 100% !important;
        }
        /* Keyframe animation for elements fading and sliding up into view */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        /* Keyframe animation for elements scaling in */
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        /* Apply the fadeInUp animation */
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        /* Staggered animation delays for a dynamic loading effect */
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        .animation-delay-1100 { animation-delay: 1.1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }

        /* Custom Scrollbar Styles for Webkit browsers (Chrome, Safari, Edge) */
        .horizontal-scroll-container::-webkit-scrollbar {
            height: 8px; /* Height of the horizontal scrollbar */
        }

        .horizontal-scroll-container::-webkit-scrollbar-track {
            background: #2a2a2a; /* Dark background for the scrollbar track */
            border-radius: 10px;
        }

        .horizontal-scroll-container::-webkit-scrollbar-thumb {
            background-color: #ef4444; /* Red-500 for the scrollbar thumb */
            border-radius: 10px;
            border: 2px solid #2a2a2a; /* Padding around the thumb */
        }

        .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
            background-color: #dc2626; /* Red-600 on hover */
        }

        /* Custom Scrollbar Styles for Firefox */
        .horizontal-scroll-container {
            scrollbar-width: thin;
            scrollbar-color: #ef4444 #2a2a2a;
        }

        /* Vertical scrollbar for all-tracks-container (used in artist profile) */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #2a2a2a;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ef4444;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #dc2626;
        }
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ef4444 #2a2a2a;
        }
    `;
    document.head.appendChild(styleTag);

    return () => {
        if (document.head.contains(styleTag)) {
            document.head.removeChild(styleTag);
        }
    };
  }, []);


  // Effect for setting up audio event listeners (runs once on mount and re-attaches if callbacks change)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleAudioEnded);
    // Use 'canplaythrough' for a more reliable 'ready to play' signal, especially for autoplay
    audio.addEventListener('canplaythrough', () => {
      setIsAudioReady(true);
    });

    return () => {
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleAudioEnded);
        audio.removeEventListener('canplaythrough', () => { /* no-op or specific cleanup if needed */ });
    };
  }, [handleLoadedData, handleTimeUpdate, handleAudioEnded]);


  // Effect for controlling audio playback (source and play/pause)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // This listener handles the actual playing of the audio once it's ready to play through
    const handleCanPlayThrough = () => {
      setIsAudioReady(true);
      if (isPlaying && audio.paused && audio.src === currentPlaying?.audio) {
        audio.play().catch(e => {
          console.error("Autoplay prevented on canplaythrough:", e);
          setIsPlaying(false);
        });
      }
    };

    // Add listener for 'canplaythrough' to ensure play() is called when ready
    audio.addEventListener('canplaythrough', handleCanPlayThrough);


    if (currentPlaying) {
      if (audio.src !== currentPlaying.audio) {
        // New song selected: update source, load, and reset ready state
        audio.src = currentPlaying.audio;
        audio.load();
        setCurrentAudioTime(0);
        setProgress(0);
        setIsAudioReady(false); // Mark as not ready until canplaythrough for new song
      } else {
        // Same song, just toggle play/pause based on isPlaying state
        if (isPlaying) {
          if (isAudioReady && audio.paused) { // Only play if already ready and currently paused
            audio.play().catch(e => {
              console.error("Autoplay prevented on play/pause toggle for same song:", e);
              setIsPlaying(false);
            });
          }
        } else {
          audio.pause();
        }
      }
    } else {
      // No song selected, ensure audio is paused and reset states
      audio.pause();
      audio.currentTime = 0;
      setCurrentAudioTime(0);
      setProgress(0);
      setIsAudioReady(false);
    }

    return () => {
      // Clean up the 'canplaythrough' listener when component unmounts or dependencies change
      // Note: This cleanup might be problematic if 'handleCanPlayThrough' itself changes,
      // leading to stale closures. For simpler cases, directly defining the listener
      // inside useEffect and cleaning up its reference is often safer.
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [currentPlaying, isPlaying, isAudioReady]); // Dependencies include isAudioReady for toggling play/pause on same song


  // Effect for handling volume changes (separate to avoid re-triggering playback logic)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);


  const handlePlayTrack = (track) => {
    // When a user clicks a track, set the current playing track and immediately set isPlaying to true.
    // The useEffect above will handle loading the track and attempting to play when ready.
    setCurrentPlaying(track);
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);
    if (audio) {
        audio.currentTime = newTime;
        setCurrentAudioTime(newTime); // Update state immediately for smooth scrubbing
        setProgress((newTime / totalAudioDuration) * 100);
    }
  };


  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // The separate volume useEffect will handle applying this to audio.volume
  };

  const togglePlayerVisibility = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };


  const handleSelectArtist = (artist) => {
      setSelectedArtist(artist);
      setCurrentView('artist-profile');
  };

  const handleSelectAlbum = (album) => {
      setSelectedAlbum(album);
      setCurrentView('album-songs');
  };

  const handleBack = () => {
      if (currentView === 'album-songs') {
          if (selectedArtist) { // If we came from an artist profile, go back there
              setCurrentView('artist-profile');
          } else { // Otherwise, we came directly from home (or no specific artist was selected), go back to home
              setCurrentView('home');
          }
          setSelectedAlbum(null); // Clear selected album when going back
      } else if (currentView === 'artist-profile') {
          setCurrentView('home');
          setSelectedArtist(null); // Clear selected artist when going back
      }
      // If currentView is 'home', there's no further back from here.
  };

  const handleExploreGenre = (genre) => {
      console.log(`Exploring genre: ${genre}`);
      // In a multi-page app, this would navigate to a dedicated genre page
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
    // Main container for the Music page: full height, black background.
    // Padding applied here ensures consistent spacing around all content.
    <div className={`min-h-screen bg-black font-inter py-8 px-4 md:px-8 lg:px-16 ${isPlayerVisible && currentPlaying ? 'pb-24' : 'pb-8'}`}>

        {/* Home View */}
        <div className={`${currentView === 'home' ? 'block' : 'hidden'} bg-black text-white rounded-xl shadow-2xl`}>
            {/* "Explore Genres" section removed as per request */}

            {/* Listen Again Section */}
            <HorizontalScrollContainer title="Listen again" id="listen-again-section" className="animation-delay-200">
                {allSongs.slice(0, 5).map((song, index) => (
                    <ContentCard key={song.id} item={song} type="song" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            {/* Similar To Artists Section */}
            <HorizontalScrollContainer title="Similar to" id="similar-artists-section" className="animation-delay-300">
                {allArtists.slice(0, 6).map((artist, index) => (
                    <ContentCard key={artist.id} item={artist} type="artist" onClick={handleSelectArtist} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            {/* Albums For You Section */}
            <HorizontalScrollContainer title="Albums for you" id="albums-for-you-section" className="animation-delay-400">
                {allAlbums.slice(0, 5).map((album, index) => (
                    <ContentCard key={album.id} item={album} type="album" onClick={handleSelectAlbum} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            {/* Hip-hop Tracks Section */}
            <HorizontalScrollContainer title="Hip-hop" id="hiphop-section" linkText="More" onLinkClick={() => handleExploreGenre('Hip-hop')} className="animation-delay-500">
                {allSongs.filter(s => s.genre === 'Hip-hop').slice(0, 5).map((song, index) => (
                    <ContentCard key={song.id} item={song} type="track" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            {/* Radios For You Section */}
            <HorizontalScrollContainer title="Radios for you" id="radios-section" className="animation-delay-600">
                {allRadios.slice(0, 6).map((radio, index) => (
                    <ContentCard key={radio.id} item={radio} type="radio" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            {/* Featured Playlists Section */}
            <HorizontalScrollContainer title="Featured Playlists" id="featured-playlists-section" className="animation-delay-700">
                {playlists.slice(0, 5).map((playlist, index) => (
                    <ContentCard key={playlist.id} item={playlist} type="playlist" onClick={() => console.log('Playlist clicked:', playlist.title)} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>
        </div>

        {/* Artist Profile View */}
        <div className={`${currentView === 'artist-profile' ? 'block' : 'hidden'} bg-black p-4 md:p-8 rounded-xl shadow-2xl`}>
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center mb-6 p-2 rounded-lg hover:bg-gray-800 active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm">Back to Home</span>
            </button>

            {selectedArtist && (
                <>
                    {/* Artist Hero Section */}
                    <section
                        className="relative w-full h-80 flex items-end p-8 bg-cover bg-center rounded-b-xl shadow-2xl"
                        style={{ backgroundImage: `url(${selectedArtist.coverImage})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0 rounded-b-xl"></div>
                        <div className="relative z-10 flex items-center gap-6">
                            <img
                                src={selectedArtist.profileImage}
                                alt={selectedArtist.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-lg animate-scaleIn"
                            />
                            <div>
                                <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg opacity-0 animate-fadeInUp animation-delay-100">
                                    {selectedArtist.name}
                                </h1>
                                <p className="text-lg text-gray-300 opacity-0 animate-fadeInUp animation-delay-200">
                                    {selectedArtist.genre}
                                </p>
                                <button
                                    onClick={() => allSongs.filter(song => song.artist === selectedArtist.name).length > 0 && handlePlayTrack(allSongs.filter(song => song.artist === selectedArtist.name)[0])}
                                    className="mt-4 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-md font-bold opacity-0 animate-fadeInUp animation-delay-300"
                                >
                                    PLAY ALL
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Popular Tracks Section */}
                    <section className="py-12 px-4 md:px-8 lg:px-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow opacity-0 animate-fadeInUp animation-delay-400">
                                Popular <span className="text-red-500">Tracks</span>
                            </h2>
                        </div>
                        <div className="flex overflow-x-auto space-x-6 pb-4 horizontal-scroll-container relative">
                            {allSongs.filter(song => song.artist === selectedArtist.name)
                                .sort((a, b) => parseInt(b.views) - parseInt(a.views)).slice(0, 6)
                                .map((track, index) => (
                                <ContentCard key={track.id} item={track} type="track" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                            ))}
                        </div>
                    </section>

                    {/* All Tracks by Artist Section (vertical scroll) */}
                    <section className="py-12 px-4 md:px-8 lg:px-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white drop-shadow opacity-0 animate-fadeInUp animation-delay-700">
                            All <span className="text-red-500">Tracks</span> by {selectedArtist.name}
                        </h2>
                        <div className="border-t border-gray-800 pt-6 mb-12 max-h-96 overflow-y-auto custom-scrollbar">
                            {allSongs.filter(song => song.artist === selectedArtist.name).length > 0 ? (
                                allSongs.filter(song => song.artist === selectedArtist.name).map((track, index) => (
                                    <div
                                        key={track.id}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group hover:shadow-md hover:scale-[1.01]"
                                        onClick={() => handlePlayTrack(track)}
                                    >
                                        <div className="flex flex-col text-left">
                                            <span className="text-white text-lg font-medium">{track.title}</span>
                                            <span className="text-gray-400 text-sm">{track.artist}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">No tracks found for this artist.</p>
                            )}
                        </div>
                    </section>

                    {/* Albums by Artist Section */}
                    <section className="py-12 px-4 md:px-8 lg:px-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-6 opacity-0 animate-fadeInUp animation-delay-800">
                            Albums by <span className="text-purple-500">{selectedArtist.name}</span>
                        </h2>
                        <div className="flex overflow-x-auto space-x-6 pb-4 horizontal-scroll-container">
                            {allAlbums.filter(album => album.artist === selectedArtist.name).map((album, index) => (
                                <ContentCard key={album.id} item={album} type="album" onClick={handleSelectAlbum} index={index} showHoverOverlay={true} />
                            ))}
                        </div>
                    </section>

                    {/* About the Artist Section */}
                    <section className="py-12 px-4 md:px-8 lg:px-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-6 opacity-0 animate-fadeInUp animation-delay-1100">
                            About <span className="text-orange-500">{selectedArtist.name}</span>
                        </h2>
                        <div className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 opacity-0 animate-fadeInUp animation-delay-1200">
                            <p className="text-lg text-gray-300 leading-relaxed">{selectedArtist.bio}</p>
                        </div>
                    </section>
                </>
            )}
        </div>

        {/* Album Songs View */}
        <div className={`${currentView === 'album-songs' ? 'block' : 'hidden'} bg-black p-4 md:p-8 rounded-xl shadow-2xl`}>
            {/* Back button for Album Songs View */}
            <button
                onClick={handleBack}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center mb-6 p-2 rounded-lg hover:bg-gray-800 active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm">Back to Artist Profile</span>
            </button>

            {selectedAlbum && (
                <>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                        <img
                            src={selectedAlbum.albumArt}
                            alt={selectedAlbum.title}
                            className="w-48 h-48 object-cover rounded-lg shadow-xl border border-gray-700 flex-shrink-0"
                        />
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-400 mb-1">ALBUM</p>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{selectedAlbum.title}</h2>
                            <p className="text-lg text-gray-300 mb-4">{selectedAlbum.artist}</p>
                            <p className="text-sm text-gray-500">Release: {selectedAlbum.releaseDate}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6">
                        <h3 className="text-2xl font-bold text-white mb-4">Tracks</h3>
                        {allSongs.filter(song => song.album === selectedAlbum.title && song.artist === selectedAlbum.artist).length > 0 ? (
                            allSongs.filter(song => song.album === selectedAlbum.title && song.artist === selectedAlbum.artist).map((track, index) => (
                                <div
                                    key={track.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group hover:shadow-md hover:scale-[1.01]"
                                    onClick={() => handlePlayTrack(track)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-500 text-sm group-hover:text-red-400">{index + 1}.</span>
                                        <div className="flex flex-col text-left">
                                            <span className="text-white text-lg font-medium">{track.title}</span>
                                            <span className="text-gray-400 text-sm">{track.artist}</span>
                                        </div>
                                    </div>
                                    <span className="text-gray-500 text-sm">{track.views} views</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No songs found for this album.</p>
                        )}
                    </div>
                </>
            )}
        </div>

        {/* Music Player (Smaller Design) */}
        {currentPlaying && (
            <div className={`fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 py-3 px-4 flex flex-col md:flex-row items-center justify-center shadow-2xl z-50 transition-transform duration-300 transform ${isPlayerVisible ? 'translate-y-0' : 'translate-y-full'} rounded-t-xl`}>
                <audio ref={audioRef} />
                
                {/* Album Art and Song Info */}
                <div className="flex items-center space-x-3 mb-2 md:mb-0 md:w-1/4 flex-shrink-0">
                    <div className="relative group w-16 h-16 flex-shrink-0"> {/* Smaller album art */}
                        <img
                            src={currentPlaying.albumArt || "https://placehold.co/100x100/333333/FFFFFF?text=Music"}
                            alt={currentPlaying.title}
                            className="w-full h-full object-cover rounded-md shadow-md border border-gray-700 transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden">
                        <h4 className="text-lg font-bold text-white truncate">{currentPlaying.title}</h4> {/* Smaller font */}
                        <p className="text-sm text-gray-300 truncate">{currentPlaying.artist}</p> {/* Smaller font */}
                    </div>
                </div>

                {/* Playback Controls and Seek Bar */}
                <div className="flex flex-col items-center flex-grow mx-4 w-full md:w-1/2">
                    <div className="flex items-center space-x-3 mb-2"> {/* Tighter spacing */}
                        <button onClick={playPreviousSong} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-gray-800 active:scale-90"> {/* Smaller padding */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14V5" />
                            </svg>
                        </button>
                        <button
                            onClick={togglePlayPause}
                            className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 active:scale-90 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                        > {/* Smaller padding */}
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"> {/* Smaller icon */}
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"> {/* Smaller icon */}
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.456A1 1 0 008 8.3v3.4a1 1 0 001.555.844l3.945-1.972a1 1 0 000-1.688L9.555 7.456z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                        <button onClick={playNextSong} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-gray-800 active:scale-90"> {/* Smaller padding */}
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
                        <span>{formatTime(totalAudioDuration)}</span> {/* Corrected formatTime call */}
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
                    /> {/* Smaller width */}
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
        )}

      {/* Tailwind CSS Script - MUST be included for Tailwind classes to work */}
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default Musicpage;
