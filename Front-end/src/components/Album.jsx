import './Allstyle.css'

import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import useOutletContext
import { useData } from './datacontext'; // Import useData from datacontext

function AlbumsPage() {
    // State for managing the current view: 'albums' or 'songs'
    const [view, setView] = useState('albums'); // 'albums' or 'songs'
    // State to store the album selected for viewing songs
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    // Use data from DataContext
    // Removed favorites and toggleFavorite as they are no longer used here
    const { albums: albumsData, albumSongs: albumSongsData, playlists } = useData();

    // Get setCurrentPlayingSong from the Outlet context (from the global player)
    const { setCurrentPlayingSong } = useOutletContext();

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

    // Handler for clicking an album card to view its songs
    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);
        setView('songs');
        const firstSong = albumSongsData.find(song => song.albumId === album.id);
        if (firstSong) {
            setCurrentPlayingSong(firstSong); // Set the first song of the album to the global player
        }
    };

    // Handler for clicking a song within an album to play it
    const handleSongClick = (song) => {
        setCurrentPlayingSong(song); // Set the clicked song to the global player
    };

    // Handler to go back to the albums view
    const handleBackToAlbums = () => {
        setView('albums');
        setSelectedAlbum(null);
    };

    // Removed: Handler to toggle favorite status of a song
    // const handleToggleFavorite = (songId, event) => {
    //     event.stopPropagation(); // Prevent the song click handler from firing
    //     toggleFavorite(songId);
    // };

    return (
        // Main container for the entire albums page
        <div className={`bg-black text-white font-inter min-h-screen flex flex-col pt-16 pb-8`}>
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
                            {albumsData.length > 0 ? (
                                albumsData.map((album, index) => (
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
                                ))
                            ) : (
                                <p className="text-gray-500 text-center w-full">No trending albums available.</p>
                            )}
                        </div>

                        {/* Section title for New Albums */}
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-16 mb-12 text-white text-center drop-shadow opacity-0 animate-fadeInUp animation-delay-200">
                            New <span className="text-purple-500">Albums</span>
                        </h2>
                        {/* Horizontal scroll for new releases */}
                        <div className="flex overflow-x-auto space-x-6 px-6 py-6 horizontal-scroll-container relative">
                            {albumsData.slice(2).length > 0 ? (
                                albumsData.slice(2).map((album, index) => (
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
                                ))
                            ) : (
                                <p className="text-gray-500 text-center w-full">No new albums available.</p>
                            )}
                        </div>

                        {/* Popular Playlists Section */}
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-16 mb-12 text-white text-center drop-shadow opacity-0 animate-fadeInUp animation-delay-300">
                            Popular <span className="text-orange-500">Playlists</span>
                        </h2>
                        {/* Horizontal scroll for popular playlists */}
                        <div className="flex overflow-x-auto space-x-6 px-6 py-6 horizontal-scroll-container relative">
                            {playlists.length > 0 ? (
                                playlists.map((playlist, index) => (
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
                                ))
                            ) : (
                                <p className="text-gray-500 text-center w-full">No popular playlists available.</p>
                            )}
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
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-500 text-sm">{song.releaseDate}</span>
                                            {/* Removed the favorite button */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">No songs found for this album.</p>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default AlbumsPage;
