import './Allstyle.css'

import React, { useEffect, useState } from 'react';

// Dummy data for albums
const albumsData = [
    { id: 1, title: "Echoes of Eternity", artist: "Aurora Bloom", albumArt: "https://placehold.co/300x300/1a1a1a/e0e0e0?text=Album+1", releaseDate: "2023-01-15" },
    { id: 2, title: "Starlight Serenade", artist: "Lunar Drift", albumArt: "https://placehold.co/300x300/2a2a2a/e0e0e0?text=Album+2", releaseDate: "2022-11-20" },
    { id: 3, "title": "Crimson Tide", "artist": "Stellar Groove", albumArt: "https://placehold.co/300x300/3a3a3a/e0e0e0?text=Album+3", releaseDate: "2024-03-01" },
    { id: 4, "title": "Cybernetic Symphony", "artist": "Neon Circuit", albumArt: "https://placehold.co/300x300/4a4a4a/e0e0e0?text=Album+4", releaseDate: "2023-07-05" },
    { id: 5, "title": "Desert Echoes", "artist": "Whispering Sands", albumArt: "https://placehold.co/300x300/5a5a5a/e0e0e0?text=Album+5", releaseDate: "2022-09-10" },
    { id: 6, "title": "Cosmic Journey", "artist": "Galactic Dreams", albumArt: "https://placehold.co/300x300/6a6a6a/e0e0e0?text=Album+6", releaseDate: "2024-01-28" },
    { id: 7, "title": "Deep Ocean Blues", "artist": "Aqua Tones", albumArt: "https://placehold.co/300x300/7a7a7a/e0e0e0?text=Album+7", releaseDate: "2023-04-12" },
    { id: 8, "title": "Wildwood Melodies", "artist": "Verdant Sound", albumArt: "https://placehold.co/300x300/8a8a8a/e0e0e0?text=Album+8", releaseDate: "2022-10-30" },
];

// Dummy data for songs within albums
const albumSongsData = [
    { id: 101, albumId: 1, title: "Eternal Dawn", artist: "Aurora Bloom", releaseDate: "2023-01-15" },
    { id: 102, albumId: 1, title: "Whispers in the Wind", artist: "Aurora Bloom", releaseDate: "2023-01-15" },
    { id: 103, albumId: 1, title: "Crystal Tears", artist: "Aurora Bloom", releaseDate: "2023-01-15" },
    { id: 104, albumId: 1, title: "Silent Embrace", artist: "Aurora Bloom", releaseDate: "2023-01-15" },
    { id: 105, albumId: 2, title: "Lunar Glow", artist: "Lunar Drift", releaseDate: "2022-11-20" },
    { id: 106, albumId: 2, title: "Nebula Dance", artist: "Lunar Drift", releaseDate: "2022-11-20" },
    { id: 107, albumId: 2, title: "Gravity's Pull", artist: "Lunar Drift", releaseDate: "2022-11-20" },
    { id: 108, albumId: 3, title: "Red River Flow", artist: "Stellar Groove", releaseDate: "2024-03-01" },
    { id: 109, albumId: 3, title: "Mountain Peak", artist: "Stellar Groove", releaseDate: "2024-03-01" },
    { id: 110, albumId: 4, title: "Digital Heartbeat", artist: "Neon Circuit", releaseDate: "2023-07-05" },
    { id: 111, albumId: 4, title: "Circuit Breaker", artist: "Neon Circuit", releaseDate: "2023-07-05" },
    { id: 112, albumId: 5, title: "Shifting Dunes", artist: "Whispering Sands", releaseDate: "2022-09-10" },
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


function AlbumsPage() {
    // State to manage the currently playing track/album and its play/pause state
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // State for managing the current view: 'albums' or 'songs'
    const [view, setView] = useState('albums'); // 'albums' or 'songs'
    // State to store the album selected for viewing songs
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    // New state to control the visibility of the mini-player
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    // useEffect to inject global styles for full-screen layout and animations.
    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
                box-sizing: border-box !important;
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
            /* Apply the fadeInUp animation */
            .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
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
                background-color: #6b7280; /* Gray-700 for the scrollbar thumb */
                border-radius: 10px;
                border: 2px solid #2a2a2a; /* Padding around the thumb */
            }

            .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
                background-color: #ef4444; /* Red-500 on hover, matching theme */
            }

            /* Custom Scrollbar Styles for Firefox */
            .horizontal-scroll-container {
                scrollbar-width: thin; /* "auto" or "none" */
                scrollbar-color: #6b7280 #2a2a2a; /* thumb color track color */
            }
        `;
        document.head.appendChild(styleTag);

        // Cleanup function: remove the style tag when the component unmounts
        return () => {
            if (document.head.contains(styleTag)) {
                document.head.removeChild(styleTag);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Handler for play/pause button
    const handlePlayPause = () => {
        if (currentPlaying) {
            setIsPlaying(!isPlaying);
        }
    };

    // Helper function to find the next item in a list (album or song)
    const getNextItem = (dataArray, currentItem) => {
        if (!currentItem) return dataArray[0];
        const currentIndex = dataArray.findIndex(item => item.id === currentItem.id);
        const nextIndex = (currentIndex + 1) % dataArray.length;
        return dataArray[nextIndex];
    };

    // Helper function to find the previous item in a list (album or song)
    const getPreviousItem = (dataArray, currentItem) => {
        if (!currentItem) return dataArray[dataArray.length - 1];
        const currentIndex = dataArray.findIndex(item => item.id === currentItem.id);
        const prevIndex = (currentIndex - 1 + dataArray.length) % dataArray.length;
        return dataArray[prevIndex];
    };

    // Handler to play the next album/track in the list
    const playNext = () => {
        if (view === 'songs' && selectedAlbum) {
            const songsInAlbum = albumSongsData.filter(song => song.albumId === selectedAlbum.id);
            if (songsInAlbum.length > 0) {
                setCurrentPlaying(getNextItem(songsInAlbum, currentPlaying));
            }
        } else {
            setCurrentPlaying(getNextItem(albumsData, currentPlaying));
        }
        setIsPlaying(true);
        setIsPlayerVisible(true); // Ensure player is visible when next is clicked
    };

    // Handler to play the previous album/track in the list
    const playPrevious = () => {
        if (view === 'songs' && selectedAlbum) {
            const songsInAlbum = albumSongsData.filter(song => song.albumId === selectedAlbum.id);
            if (songsInAlbum.length > 0) {
                setCurrentPlaying(getPreviousItem(songsInAlbum, currentPlaying));
            }
        } else {
            setCurrentPlaying(getPreviousItem(albumsData, currentPlaying));
        }
        setIsPlaying(true);
        setIsPlayerVisible(true); // Ensure player is visible when previous is clicked
    };

    // Handler for clicking an album card to view its songs
    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);
        setView('songs');
        const firstSong = albumSongsData.find(song => song.albumId === album.id);
        if (firstSong) {
            setCurrentPlaying(firstSong);
            setIsPlaying(true);
            setIsPlayerVisible(true); // Show player when album is clicked
        } else {
            setCurrentPlaying(album); // Set to album if no songs for display in player
            setIsPlaying(false);
            setIsPlayerVisible(false); // Hide player if no songs in album
        }
    };

    // Handler for clicking a song within an album to play it
    const handleSongClick = (song) => {
        setCurrentPlaying(song);
        setIsPlaying(true);
        setIsPlayerVisible(true); // Show player when a song is clicked
    };

    // Handler to go back to the albums view
    const handleBackToAlbums = () => {
        setView('albums');
        setSelectedAlbum(null);
        setCurrentPlaying(null); // This will make the player disappear
        setIsPlaying(false);
        setIsPlayerVisible(false); // Hide player when navigating back to albums
    };

    // Handler to toggle player visibility
    const togglePlayerVisibility = () => {
        setIsPlayerVisible(!isPlayerVisible);
    };

    return (
        // Main container for the entire albums page
        <div className={`bg-black text-white font-inter min-h-screen flex flex-col pt-16 ${isPlayerVisible && currentPlaying ? 'pb-24' : 'pb-8'}`}>
            {/* Header section, mimicking a simplified navbar from YouTube Music */}
            <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
                <div className="text-red-500 text-3xl font-extrabold tracking-wider">
                    MUSIC<span className="text-white text-2xl">ALER</span> <span className="text-gray-400 text-lg">/ {view === 'albums' ? 'Albums' : selectedAlbum ? selectedAlbum.title : 'Music'}</span>
                </div>
                {/* Optional: Add a search bar or user icon here if desired */}
            </header>

            {/* Main content area for displaying albums/playlists or album songs */}
            <section className="flex-grow py-8 px-4 md:px-8 lg:px-16 mt-8">
                {view === 'albums' ? (
                    <>
                        {/* Section title for Trending Albums */}
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-white text-center drop-shadow opacity-0 animate-fadeInUp animation-delay-100">
                            Trending <span className="text-red-500">Albums</span>
                        </h2>

                        {/* Horizontal scroll for trending albums */}
                        <div className="flex overflow-x-auto space-x-6 px-6 py-6 horizontal-scroll-container relative">
                            {albumsData.map((album, index) => (
                                // Individual album card
                                <div
                                    key={album.id}
                                    className={`flex-shrink-0 w-full sm:w-48 bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700
                                                transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                                                transition-all duration-300 cursor-pointer opacity-0 animate-fadeInUp animation-delay-${(index + 1) * 100}
                                                relative z-0 hover:z-10`}
                                    onClick={() => handleAlbumClick(album)}
                                >
                                    <img
                                        src={album.albumArt}
                                        alt={album.title}
                                        className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
                                    />
                                    <h3 className="text-lg font-bold text-white mb-1 truncate w-full">{album.title}</h3>
                                    <p className="text-sm text-gray-400 truncate w-full">{album.artist}</p>
                                    <p className="text-xs text-gray-500 mt-2">Release: {album.releaseDate}</p>
                                </div>
                            ))}
                        </div>

                        {/* Section title for New Albums */}
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-16 mb-12 text-white text-center drop-shadow opacity-0 animate-fadeInUp animation-delay-200">
                            New <span className="text-purple-500">Albums</span>
                        </h2>
                        {/* Horizontal scroll for new releases */}
                        <div className="flex overflow-x-auto space-x-6 px-6 py-6 horizontal-scroll-container relative">
                            {albumsData.slice(2).map((album, index) => (
                                <div
                                    key={album.id + '-new'}
                                    className={`flex-shrink-0 w-full sm:w-48 bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700
                                                transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                                                transition-all duration-300 cursor-pointer opacity-0 animate-fadeInUp animation-delay-${(index + 1) * 100}
                                                relative z-0 hover:z-10`}
                                    onClick={() => handleAlbumClick(album)}
                                >
                                    <img
                                        src={album.albumArt}
                                        alt={album.title}
                                        className="w-full h-36 md:h-48 object-cover rounded-md mb-4 shadow-md"
                                    />
                                    <h3 className="text-lg font-bold text-white mb-1 truncate w-full">{album.title}</h3>
                                    <p className="text-sm text-gray-400 truncate w-full">{album.artist}</p>
                                    <p className="text-xs text-gray-500 mt-2">Release: {album.releaseDate}</p>
                                </div>
                            ))}
                        </div>

                        {/* Popular Playlists Section */}
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-16 mb-12 text-white text-center drop-shadow opacity-0 animate-fadeInUp animation-delay-300">
                            Popular <span className="text-orange-500">Playlists</span>
                        </h2>
                        {/* Horizontal scroll for popular playlists */}
                        <div className="flex overflow-x-auto space-x-6 px-6 py-6 horizontal-scroll-container relative">
                            {playlists.map((playlist, index) => (
                                <div
                                    key={playlist.id}
                                    className={`flex-shrink-0 w-full sm:w-48 bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700
                                                transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                                                transition-all duration-300 cursor-pointer opacity-0 animate-fadeInUp animation-delay-${(index + 1) * 100}
                                                relative z-0 hover:z-10`}
                                >
                                    <img
                                        src={playlist.cover}
                                        alt={playlist.title}
                                        className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
                                    />
                                    <h3 className="text-lg font-bold text-white mb-1 truncate w-full">{playlist.title}</h3>
                                    <p className="text-sm text-gray-400 truncate w-full">{playlist.description}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // Album Songs View
                    <div className="bg-gray-950 p-4 md:p-8 rounded-xl shadow-2xl animate-fadeInUp">
                        <button
                            onClick={handleBackToAlbums}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center mb-6 p-2 rounded-lg hover:bg-gray-800 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Back to Albums
                        </button>
                        {selectedAlbum && (
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
                        )}

                        <div className="border-t border-gray-800 pt-6">
                            <h3 className="text-2xl font-bold text-white mb-4">Tracks</h3>
                            {albumSongsData.filter(song => song.albumId === selectedAlbum?.id).length > 0 ? (
                                albumSongsData.filter(song => song.albumId === selectedAlbum?.id).map((song, index) => (
                                    <div
                                        key={song.id}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group hover:shadow-md hover:scale-[1.01]"
                                        onClick={() => handleSongClick(song)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-500 text-sm group-hover:text-red-400">{index + 1}.</span>
                                            <div className="flex flex-col text-left">
                                                <span className="text-white text-lg font-medium">{song.title}</span>
                                                <span className="text-gray-400 text-sm">{song.artist}</span>
                                            </div>
                                        </div>
                                        <span className="text-gray-500 text-sm">{song.releaseDate}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">No songs found for this album.</p>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* Mini Player - Fixed at the bottom of the viewport */}
            {currentPlaying && ( // Only render mini-player if currentPlaying is not null
                <div className={`fixed bottom-0 left-0 w-full bg-gray-950 border-t border-gray-700 p-4 flex items-center justify-between shadow-2xl z-50 transition-transform duration-300 ${isPlayerVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                    {/* Current playing album/track info (album art, title, artist) */}
                    <div className="flex items-center space-x-4">
                        {/* Display album art from the current playing item. If currentPlaying is a song, get its albumArt from its parent album. */}
                        <img
                            src={
                                currentPlaying.albumArt ||
                                (currentPlaying.albumId && albumsData.find(album => album.id === currentPlaying.albumId)?.albumArt) ||
                                "https://placehold.co/100x100/333333/FFFFFF?text=Music"
                            }
                            alt={currentPlaying.title}
                            className="w-16 h-16 object-cover rounded-lg shadow-md border border-gray-700"
                        />
                        <div>
                            <h4 className="text-lg font-semibold text-white">{currentPlaying.title}</h4>
                            <p className="text-sm text-gray-400">{currentPlaying.artist}</p>
                        </div>
                    </div>
                    {/* Playback controls (previous, play/pause, next) */}
                    <div className="flex items-center space-x-4">
                        <button onClick={playPrevious} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 active:scale-90">
                            {/* SVG for previous album/track icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14V5" />
                            </svg>
                        </button>
                        <button
                            onClick={handlePlayPause}
                            className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 active:scale-90 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            {/* Conditional rendering for Play/Pause icon (play icon is already an arrow) */}
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.456A1 1 0 008 8.3v3.4a1 1 0 001.555.844l3.945-1.972a1 1 0 000-1.688L9.555 7.456z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                        <button onClick={playNext} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 active:scale-90">
                            {/* SVG for next album/track icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5v14" />
                            </svg>
                        </button>
                    </div>
                    {/* Arrow button to hide/show player */}
                    <button
                        onClick={togglePlayerVisibility}
                        className="absolute -top-6 right-4 bg-gray-950 text-gray-400 p-1 rounded-t-lg hover:text-red-500 hover:bg-gray-800 transition-colors duration-200 focus:outline-none z-50"
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
        </div>
    );
}

export default AlbumsPage;
