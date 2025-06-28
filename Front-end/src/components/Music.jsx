import './Allstyle.css'
import vannda from '../assets/vannDa.mp3'
import React, { useState, useEffect } from 'react'; // Removed useRef, useCallback as player logic moved
import { useOutletContext } from 'react-router-dom'; // Import useOutletContext

// --- Dummy Data (Expanded for different sections) ---
const allSongs = [
  { id: 1, title: 'សុវណ្ណភូមិ (GOLDEN LAND)', artist: 'VANNDA', album: 'treyvisai_iii_return_to_sovannaphum', albumArt: 'https://placehold.co/150x150/007bff/ffffff?text=Starlight', audio: vannda , genre: 'Hip-hop', views: '15M' },
  { id: 2, title: 'SoundHelix Song 2', artist: 'SoundHelix', album: 'SoundHelix Album', albumArt: 'https://placehold.co/150x150/ff0000/ffffff?text=SH2', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', genre: 'Electronic', views: '5M' },
  { id: 3, title: 'SoundHelix Song 3', artist: 'SoundHelix', album: 'SoundHelix Album', albumArt: 'https://placehold.co/150x150/00ff00/ffffff?text=SH3', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', genre: 'Electronic', views: '8M' },
  { id: 4, title: 'SoundHelix Song 4', artist: 'SoundHelix', album: 'SoundHelix Album', albumArt: 'https://placehold.co/150x150/0000ff/ffffff?text=SH4', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', genre: 'Electronic', views: '12M' },
  { id: 5, title: 'SoundHelix Song 5', artist: 'SoundHelix', album: 'SoundHelix Album', albumArt: 'https://placehold.co/150x150/ffff00/ffffff?text=SH5', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', genre: 'Electronic', views: '10M' },
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


// Main Musicpage Component (now receives setCurrentPlayingSong from App.jsx)
const Musicpage = () => {
  // State for managing view within Musicpage
  const [currentView, setCurrentView] = useState('home');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Get setCurrentPlayingSong from the Outlet context provided by LayoutWithNavbarAndPlayer in App.jsx
  const { setCurrentPlayingSong } = useOutletContext();

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


  // This function now simply calls the setCurrentPlayingSong from App.jsx
  const handlePlayTrack = (track) => {
    setCurrentPlayingSong(track);
    // No need to manage isPlaying or isPlayerVisible here, App.jsx handles it
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
          if (selectedArtist) {
              setCurrentView('artist-profile');
          } else {
              setCurrentView('home');
          }
          setSelectedAlbum(null);
      } else if (currentView === 'artist-profile') {
          setCurrentView('home');
          setSelectedArtist(null);
      }
  };

  const handleExploreGenre = (genre) => {
      console.log(`Exploring genre: ${genre}`);
  };


  return (
    // Removed dynamic pb-24 here, as App.jsx will handle overall padding if player is visible
    <div className={`min-h-screen bg-black font-inter py-8 px-4 md:px-8 lg:px-16 pb-8`}>

        {/* Home View */}
        <div className={`${currentView === 'home' ? 'block' : 'hidden'} bg-black text-white rounded-xl shadow-2xl`}>
            <HorizontalScrollContainer title="Listen again" id="listen-again-section" className="animation-delay-200">
                {allSongs.slice(0, 5).map((song, index) => (
                    <ContentCard key={song.id} item={song} type="song" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            <HorizontalScrollContainer title="Similar to" id="similar-artists-section" className="animation-delay-300">
                {allArtists.slice(0, 6).map((artist, index) => (
                    <ContentCard key={artist.id} item={artist} type="artist" onClick={handleSelectArtist} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            <HorizontalScrollContainer title="Albums for you" id="albums-for-you-section" className="animation-delay-400">
                {allAlbums.slice(0, 5).map((album, index) => (
                    <ContentCard key={album.id} item={album} type="album" onClick={handleSelectAlbum} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            <HorizontalScrollContainer title="Hip-hop" id="hiphop-section" linkText="More" onLinkClick={() => handleExploreGenre('Hip-hop')} className="animation-delay-500">
                {allSongs.filter(s => s.genre === 'Hip-hop').slice(0, 5).map((song, index) => (
                    <ContentCard key={song.id} item={song} type="track" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            <HorizontalScrollContainer title="Radios for you" id="radios-section" className="animation-delay-600">
                {allRadios.slice(0, 6).map((radio, index) => (
                    <ContentCard key={radio.id} item={radio} type="radio" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>

            <HorizontalScrollContainer title="Featured Playlists" id="featured-playlists-section" className="animation-delay-700">
                {playlists.slice(0, 5).map((playlist, index) => (
                    <ContentCard key={playlist.id} item={playlist} type="playlist" onClick={() => console.log('Playlist clicked:', playlist.title)} index={index} showHoverOverlay={true} />
                ))}
            </HorizontalScrollContainer>
        </div>

        {/* Artist Profile View */}
        <div className={`${currentView === 'artist-profile' ? 'block' : 'hidden'} bg-black p-4 md:p-8 rounded-xl shadow-2xl`}>
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

      {/* Tailwind CSS Script - MUST be included for Tailwind classes to work */}
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default Musicpage;
