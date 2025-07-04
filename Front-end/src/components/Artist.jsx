import './Allstyle.css'
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import useOutletContext
import { useData } from './datacontext'; // Import useData hook

function ArtistPage() {
    // Get data from DataContext
    const { songs, artists, albums } = useData();

    // Get setCurrentPlayingSong from the Outlet context provided by LayoutWithNavbarAndPlayer in App.jsx
    const { setCurrentPlayingSong } = useOutletContext();

    // State for the currently playing track and its play/pause state
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // State to control the visibility of the mini-player
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    // New state to manage the current view: 'profile', 'allArtists', or 'albumSongs'
    const [view, setView] = useState('allArtists'); // Changed default view to 'allArtists'
    // State to hold the artist whose profile is currently being viewed in 'profile' or 'allArtistContent'
    const [currentArtistInView, setCurrentArtistInView] = useState(null); // Initialize as null, will be set on selection
    // New state to hold the album selected for viewing songs
    const [selectedAlbumForSongs, setSelectedAlbumForSongs] = useState(null);

    // useEffect to inject global styles for full-screen layout and animations and custom scrollbar.
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

            /* Vertical scrollbar for all-tracks-container */
            .all-tracks-container::-webkit-scrollbar {
                width: 8px; /* Width of the vertical scrollbar */
            }

            .all-tracks-container::-webkit-scrollbar-track {
                background: #2a2a2a; /* Dark background for the scrollbar track */
                border-radius: 10px;
            }

            .all-tracks-container::-webkit-scrollbar-thumb {
                background-color: #6b7280; /* Gray-700 for the scrollbar thumb */
                border-radius: 10px;
                border: 2px solid #2a2a2a; /* Padding around the thumb */
            }

            .all-tracks-container::-webkit-scrollbar-thumb:hover {
                background-color: #ef4444; /* Red-500 on hover, matching theme */
            }

            .all-tracks-container {
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
    }, []);

    // Handler for play/pause button (for the mini-player's internal state)
    const handlePlayPause = () => {
        if (currentPlaying) {
            setIsPlaying(!isPlaying);
            // In a real scenario, you'd also control the actual audio element here
        }
    };

    // Helper function to find the next item in a list (track or album)
    const getNextItem = (dataArray, currentItem) => {
        if (!currentItem || dataArray.length === 0) return dataArray[0];
        const currentIndex = dataArray.findIndex(item => item.id === currentItem.id);
        const nextIndex = (currentIndex + 1) % dataArray.length;
        return dataArray[nextIndex];
    };

    // Helper function to find the previous item in a list (track or album)
    const getPreviousItem = (dataArray, currentItem) => {
        if (!currentItem || dataArray.length === 0) return dataArray[dataArray.length - 1];
        const currentIndex = dataArray.findIndex(item => item.id === currentItem.id);
        const prevIndex = (currentIndex - 1 + dataArray.length) % dataArray.length;
        return dataArray[prevIndex];
    };

    // Handler to play the next track in the current context
    const playNext = () => {
        let tracksToPlayFrom = [];
        if (view === 'albumSongs' && selectedAlbumForSongs) {
            tracksToPlayFrom = songs.filter(track => track.album === selectedAlbumForSongs.title && track.artist === selectedAlbumForSongs.artist);
        } else if (view === 'profile' && currentArtistInView) {
            tracksToPlayFrom = songs.filter(track => track.artist === currentArtistInView.name);
        } else { // 'allArtists' view or fallback
            tracksToPlayFrom = songs;
        }

        if (tracksToPlayFrom.length > 0) {
            const nextTrack = getNextItem(tracksToPlayFrom, currentPlaying);
            setCurrentPlaying(nextTrack);
            setCurrentPlayingSong(nextTrack); // Update global player
            setIsPlaying(true);
            setIsPlayerVisible(true);
        } else {
            setCurrentPlaying(null);
            setCurrentPlayingSong(null);
            setIsPlaying(false);
            setIsPlayerVisible(false);
        }
    };

    // Handler to play the previous track in the current context
    const playPrevious = () => {
        let tracksToPlayFrom = [];
        if (view === 'albumSongs' && selectedAlbumForSongs) {
            tracksToPlayFrom = songs.filter(track => track.album === selectedAlbumForSongs.title && track.artist === selectedAlbumForSongs.artist);
        } else if (view === 'profile' && currentArtistInView) {
            tracksToPlayFrom = songs.filter(track => track.artist === currentArtistInView.name);
        } else { // 'allArtists' view or fallback
            tracksToPlayFrom = songs;
        }

        if (tracksToPlayFrom.length > 0) {
            const prevTrack = getPreviousItem(tracksToPlayFrom, currentPlaying);
            setCurrentPlaying(prevTrack);
            setCurrentPlayingSong(prevTrack); // Update global player
            setIsPlaying(true);
            setIsPlayerVisible(true);
        } else {
            setCurrentPlaying(null);
            setCurrentPlayingSong(null);
            setIsPlaying(false);
            setIsPlayerVisible(false);
        }
    };

    // Handler for clicking a track to play it
    const handleTrackClick = (track) => {
        setCurrentPlaying(track); // Set local state for mini-player
        setCurrentPlayingSong(track); // Update global player state in App.jsx
        setIsPlaying(true);
        setIsPlayerVisible(true);
    };

    // Handler for clicking an album card to view its songs
    const handleAlbumClick = (album) => {
        setSelectedAlbumForSongs(album);
        setView('albumSongs');
        // Optionally, set the first song of the album to play
        const firstSong = songs.find(song => song.album === album.title && song.artist === album.artist);
        if (firstSong) {
            setCurrentPlaying(firstSong);
            setCurrentPlayingSong(firstSong); // Update global player
            setIsPlaying(true);
            setIsPlayerVisible(true);
        } else {
            setCurrentPlaying(null); // Set to null if no songs for display in player
            setCurrentPlayingSong(null);
            setIsPlaying(false);
            setIsPlayerVisible(false); // Hide player if no songs in album
        }
    };

    // Handler to toggle player visibility
    const togglePlayerVisibility = () => {
        setIsPlayerVisible(!isPlayerVisible);
    };

    // Handler to switch to the "All Artists" view (main entry point)
    const handleViewAllArtists = () => {
        setView('allArtists');
        setCurrentArtistInView(null); // Clear selected artist
        setCurrentPlaying(null); // Clear currently playing when moving to general artist list
        setCurrentPlayingSong(null);
        setIsPlaying(false);
        setIsPlayerVisible(false);
    };

    // Universal Back button handler
    const handleBack = () => {
        if (view === 'albumSongs') {
            setView('profile'); // From album songs, always go back to artist profile
            setSelectedAlbumForSongs(null);
        } else if (view === 'profile') {
            setView('allArtists'); // From artist profile, go back to all artists list
            setCurrentArtistInView(null); // Clear selected artist
        }
        // If view is 'allArtists', there's no back, as it's the initial page.
        setCurrentPlaying(null); // Clear mini-player content until a track is chosen
        setCurrentPlayingSong(null);
        setIsPlaying(false);
        setIsPlayerVisible(false);
    };

    // Handler for selecting an artist from the AllArtistsPage
    const handleSelectArtistFromList = (artist) => {
        setCurrentArtistInView(artist); // Set the artist whose profile we want to see
        setView('profile'); // Go to the profile view of the selected artist
        setCurrentPlaying(null); // Clear mini-player content until a track is chosen
        setCurrentPlayingSong(null);
        setIsPlaying(false);
        setIsPlayerVisible(false);
    };

    // Component for AllArtistsPage (nested for demonstration within a single immersive)
    const AllArtistsPageContent = () => {
        return (
            <div className="bg-gray-950 p-4 md:p-8 rounded-xl shadow-2xl animate-fadeInUp">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-white text-center drop-shadow">
                    All <span className="text-red-500">Artists</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 relative">
                    {artists.map((artist, index) => ( // Use artists from context
                        <div
                            key={artist.id}
                            className={`flex-shrink-0 w-48 bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700
                                        transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                                        transition-all duration-300 cursor-pointer opacity-0 animate-fadeInUp animation-delay-${(index + 1) * 100}
                                        relative z-0 hover:z-10`}
                            onClick={() => handleSelectArtistFromList(artist)}
                        >
                            <img
                                src={artist.profileImage}
                                alt={artist.name}
                                className="w-full h-48 object-cover rounded-md mb-4 shadow-md" // Make profile circular
                            />
                            <h3 className="text-lg font-bold text-white mb-1 truncate w-full text-center">{artist.name}</h3>
                            <p className="text-sm text-gray-400 truncate w-full text-center">{artist.genre}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Component for Album Songs View (nested for demonstration)
    const AlbumSongsViewContent = () => {
        // Filter songs based on the selected album's title and artist
        const songsInAlbum = songs.filter(song =>
            selectedAlbumForSongs && song.album === selectedAlbumForSongs.title && song.artist === selectedAlbumForSongs.artist
        );

        return (
            <div className="bg-gray-950 p-4 md:p-8 rounded-xl shadow-2xl animate-fadeInUp">
                {/* Back button for Album Songs View, similar to Albums Page */}
                <button
                    onClick={handleBack} // This handler goes back to the artist profile
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center mb-6 p-2 rounded-lg hover:bg-gray-800 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-sm">Back to Artist Profile</span>
                </button>
                {selectedAlbumForSongs && (
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                        <img
                            src={selectedAlbumForSongs.albumArt}
                            alt={selectedAlbumForSongs.title}
                            className="w-48 h-48 object-cover rounded-lg shadow-xl border border-gray-700 flex-shrink-0"
                        />
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-400 mb-1">ALBUM</p>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{selectedAlbumForSongs.title}</h2>
                            <p className="text-lg text-gray-300 mb-4">{selectedAlbumForSongs.artist}</p>
                            <p className="text-sm text-gray-500">Release: {selectedAlbumForSongs.releaseDate}</p>
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-800 pt-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Tracks</h3>
                    {songsInAlbum.length > 0 ? (
                        songsInAlbum.map((song, index) => (
                            <div
                                key={song.id}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group hover:shadow-md hover:scale-[1.01]"
                                onClick={() => handleTrackClick(song)}
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-500 text-sm group-hover:text-red-400">{index + 1}.</span>
                                    <div className="flex flex-col text-left">
                                        <span className="text-white text-lg font-medium">{song.title}</span>
                                        <span className="text-gray-400 text-sm">{song.artist}</span>
                                    </div>
                                </div>
                                <span className="text-gray-500 text-sm">{song.views} views</span> {/* Use song.views if available */}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No songs found for this album.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        // Main container for the artist page
        <div className={`bg-black text-white font-inter min-h-screen flex flex-col pt-16 ${isPlayerVisible && currentPlaying ? 'pb-24' : 'pb-8'}`}>
            {/* Header section */}
            <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
                <div className="text-red-500 text-3xl font-extrabold tracking-wider">
                    MUSIC<span className="text-white text-2xl">ALER</span>
                    <span className="text-gray-400 text-lg">
                        {view === 'allArtists' ? '' : // No text if viewing all artists
                         view === 'profile' && currentArtistInView ? ` / ${currentArtistInView.name}` :
                         view === 'albumSongs' && selectedAlbumForSongs ? ` / ${selectedAlbumForSongs?.title}` :
                         ''}
                    </span>
                </div>
            </header>

            {/* Main content area based on view state */}
            <section className="flex-grow py-8 px-4 md:px-8 lg:px-16 mt-8">
                {view === 'profile' && currentArtistInView ? (
                    <>
                        {/* Back button for Artist Profile */}
                        <button
                            onClick={handleBack}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center mb-6 p-2 rounded-lg hover:bg-gray-800 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-sm">Back to All Artists</span>
                        </button>
                        {/* Artist Hero Section */}
                        <section
                            className="relative w-full h-80 flex items-end p-8 bg-cover bg-center rounded-b-xl shadow-2xl"
                            style={{ backgroundImage: `url(${currentArtistInView.coverImage})` }}
                        >
                            {/* Overlay for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0 rounded-b-xl"></div>
                            <div className="relative z-10 flex items-center gap-6">
                                <img
                                    src={currentArtistInView.profileImage}
                                    alt={currentArtistInView.name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-lg animate-scaleIn"
                                />
                                <div>
                                    <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg opacity-0 animate-fadeInUp animation-delay-100">
                                        {currentArtistInView.name}
                                    </h1>
                                    <p className="text-lg text-gray-300 opacity-0 animate-fadeInUp animation-delay-200">
                                        {currentArtistInView.genre}
                                    </p>
                                    <button
                                        onClick={() => {
                                            const artistSongs = songs.filter(t => t.artist === currentArtistInView.name);
                                            if (artistSongs.length > 0) handleTrackClick(artistSongs[0]);
                                        }}
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
                                {songs.filter(track => track.artist === currentArtistInView.name)
                                    .sort((a, b) => (parseInt(b.views) || 0) - (parseInt(a.views) || 0)) // Sort by views
                                    .slice(0, 6) // Show top 6 popular tracks for current artist
                                    .map((track, index) => (
                                    <div
                                        key={track.id}
                                        className={`flex-shrink-0 w-48 bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700
                                                    transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                                                    transition-all duration-300 cursor-pointer opacity-0 animate-fadeInUp animation-delay-${(index + 5) * 100}
                                                    relative z-0 hover:z-10`}
                                        onClick={() => handleTrackClick(track)}
                                    >
                                        <img
                                            src={track.albumArt}
                                            alt={track.title}
                                            className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
                                        />
                                        <h3 className="text-lg font-bold text-white mb-1 truncate w-full">{track.title}</h3>
                                        <p className="text-sm text-gray-400 truncate w-full">{track.artist}</p>
                                        <p className="text-xs text-gray-500 mt-2">Views: {track.views}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* All Tracks by Artist Section (newly placed here with vertical scroll) */}
                        <section className="py-12 px-4 md:px-8 lg:px-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white drop-shadow opacity-0 animate-fadeInUp animation-delay-700">
                                All <span className="text-red-500">Tracks</span> by {currentArtistInView.name}
                            </h2>
                            <div className="border-t border-gray-800 pt-6 mb-12 max-h-96 overflow-y-auto all-tracks-container">
                                {songs.filter(track => track.artist === currentArtistInView.name).length > 0 ? (
                                    songs.filter(track => track.artist === currentArtistInView.name).map((track, index) => (
                                        <div
                                            key={track.id}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group hover:shadow-md hover:scale-[1.01]"
                                            onClick={() => handleTrackClick(track)}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <span className="text-gray-500 text-sm group-hover:text-red-400">{index + 1}.</span>
                                                <div className="flex flex-col text-left">
                                                    <span className="text-white text-lg font-medium">{track.title}</span>
                                                    <span className="text-gray-400 text-sm">{track.artist}</span>
                                                </div>
                                            </div>
                                            <span className="text-gray-500 text-sm">Views: {track.views}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No tracks found for this artist.</p>
                                )}
                            </div>
                        </section>

                        {/* Albums by Artist Section */}
                        <section className="py-12 px-4 md:px-8 lg:px-16">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow opacity-0 animate-fadeInUp animation-delay-800">
                                    Albums by <span className="text-purple-500">{currentArtistInView.name}</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 relative">
                                {albums.filter(album => album.artist === currentArtistInView.name).map((album, index) => ( // Use albums from context
                                    <div
                                        key={album.id}
                                        className={`bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700
                                                    transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                                                    transition-all duration-300 cursor-pointer opacity-0 animate-fadeInUp animation-delay-${(index + 9) * 100}
                                                    relative z-0 hover:z-10`}
                                        onClick={() => handleAlbumClick(album)} // Now calls handleAlbumClick
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
                        </section>

                        {/* About the Artist Section */}
                        <section className="py-12 px-4 md:px-8 lg:px-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white drop-shadow opacity-0 animate-fadeInUp animation-delay-1100">
                                About <span className="text-orange-500">{currentArtistInView.name}</span>
                            </h2>
                            <div className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 opacity-0 animate-fadeInUp animation-delay-1200">
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {currentArtistInView.bio}
                                </p>
                            </div>
                        </section>
                    </>
                ) : view === 'albumSongs' ? (
                    <AlbumSongsViewContent />
                ) : (
                    // All Artists View (using AllArtistsPageContent component)
                    <AllArtistsPageContent />
                )}
            </section>

            {/* Mini Player - Fixed at the bottom of the viewport */}
            {currentPlaying && (
                <div className={`fixed bottom-0 left-0 w-full bg-gray-950 border-t border-gray-700 p-4 flex items-center justify-between shadow-2xl z-50 transition-transform duration-300 ${isPlayerVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="flex items-center space-x-4">
                        <img
                            src={currentPlaying.albumArt || currentPlaying.profileImage || "https://placehold.co/100x100/333333/FFFFFF?text=Music"}
                            alt={currentPlaying.title || currentPlaying.name}
                            className="w-16 h-16 object-cover rounded-lg shadow-md border border-gray-700"
                        />
                        <div>
                            <h4 className="text-lg font-semibold text-white">{currentPlaying.title || currentPlaying.name}</h4>
                            <p className="text-sm text-gray-400">{currentPlaying.artist || currentPlaying.genre}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={playPrevious} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 active:scale-90">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14V5" />
                            </svg>
                        </button>
                        <button
                            onClick={handlePlayPause}
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
                        <button onClick={playNext} className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 active:scale-90">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5v14" />
                            </svg>
                        </button>
                    </div>
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

export default ArtistPage;
