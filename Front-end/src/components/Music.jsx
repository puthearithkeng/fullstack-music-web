import './Allstyle.css';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useData } from './datacontext'; // Import the useData hook

// --- Reusable Components ---

/**
 * HorizontalScrollContainer component for displaying horizontally scrollable content sections.
 * It includes a title and an optional "More" link.
 */
const HorizontalScrollContainer = ({ children, title, linkText, onLinkClick, id, className = '' }) => (
    <section className={`mb-8 md:mb-12 ${className}`} id={id}> {/* Removed opacity and animation classes */}
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

/**
 * ContentCard component for displaying individual music items (song, album, artist, radio, playlist).
 * It shows an image, title, subtitle, and optional extra info, with a hover play overlay.
 */
const ContentCard = ({ item, type, onClick, index = 0, showHoverOverlay = true }) => {
    // Determine the image URL based on the item type
    let imageUrl = item.albumArt || item.profileImage || item.image || 'https://placehold.co/150x150/6c757d/ffffff?text=No+Art';
    // Determine the main title
    let title = item.title || item.name;
    // Determine the subtitle (artist, genre, etc.)
    let subtitle = item.artist || item.genre || '';
    // Determine any extra information to display (views, release date)
    let extraInfo = item.views || item.releaseDate;

    // Conditionally apply the hover class for the play button overlay
    const hoverOverlayClass = showHoverOverlay ? 'group-hover:opacity-100' : '';

    return (
        <div
            className={`group flex-shrink-0 w-40 sm:w-48 bg-gray-900 p-3 rounded-xl shadow-xl border border-gray-800
                        transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                        transition-all duration-300 cursor-pointer relative overflow-hidden`} // Removed opacity and animation classes
            onClick={() => onClick(item, type)}
        >
            <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden mb-3 shadow-lg">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    // Fallback for broken image links
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/6c757d/ffffff?text=No+Art'; }}
                />
                {/* Play button overlay */}
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

/**
 * Main Musicpage Component.
 * Displays various music categories, artist profiles, and album song lists.
 * It fetches data using the `useData` hook from DataContext.
 */
const Musicpage = () => {
    // State for managing the current view within the Musicpage (home, artist-profile, album-songs)
    const [currentView, setCurrentView] = useState('home');
    // State to store the currently selected artist for the artist profile view
    const [selectedArtist, setSelectedArtist] = useState(null);
    // State to store the currently selected album for the album songs view
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    // Use the `useData` hook to access all the music data from the DataContext
    const { songs, artists, albums, radios, playlists } = useData();

    // Removed: State to manage the loading status of the page
    // const [loading, setLoading] = useState(true);

    // Get `setCurrentPlayingSong` from the Outlet context, which is provided by `LayoutWithNavbarAndPlayer` in `App.jsx`.
    // This allows Musicpage to control the global music player.
    const { setCurrentPlayingSong } = useOutletContext();

    // useEffect hook for global styles.
    // This runs once when the component mounts.
    useEffect(() => {
        // Removed: Simulate a data fetching delay

        // Dynamically create and append a style tag for global CSS, including custom scrollbar styles and animations.
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            html, body {
                margin-top: 30px !important;
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
            /* Removed Keyframe animations for elements fading and sliding up into view */
            /* Removed Keyframe animation for elements scaling in */
            /* Removed Apply the fadeInUp animation */
            /* Removed Staggered animation delays for a dynamic loading effect */

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

        // Cleanup function to remove the style tag when the component unmounts
        return () => {
            if (document.head.contains(styleTag)) {
                document.head.removeChild(styleTag);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    /**
     * Handles playing a track by setting it as the current playing song in the global player.
     * @param {object} track - The track object to be played.
     */
    const handlePlayTrack = (track) => {
        // When playing a track from the main Musicpage, the playable list is all songs
        setCurrentPlayingSong(track, songs);
    };

    /**
     * Handles selecting an artist, transitioning to the artist profile view.
     * @param {object} artist - The artist object that was selected.
     */
    const handleSelectArtist = (artist) => {
        setSelectedArtist(artist);
        setCurrentView('artist-profile');
    };

    /**
     * Handles selecting an album, transitioning to the album songs view.
     * @param {object} album - The album object that was selected.
     */
    const handleSelectAlbum = (album) => {
        setSelectedAlbum(album);
        setCurrentView('album-songs');
    };

    /**
     * Handles the back button functionality, navigating between views.
     */
    const handleBack = () => {
        if (currentView === 'album-songs') {
            if (selectedArtist) {
                // If we came from an artist's album list, go back to the artist profile
                setCurrentView('artist-profile');
            } else {
                // If we came directly from home to an album, go back to home
                setCurrentView('home');
            }
            setSelectedAlbum(null); // Clear selected album
            // When going back to a view where all songs are playable, update the global player's list
            setCurrentPlayingSong(null, songs);
        } else if (currentView === 'artist-profile') {
            setCurrentView('home'); // Go back to home from artist profile
            setSelectedArtist(null); // Clear selected artist
            // When going back to home, ensure the global player's list is all songs
            setCurrentPlayingSong(null, songs);
        }
    };

    /**
     * Placeholder function for exploring a genre.
     * @param {string} genre - The genre to explore.
     */
    const handleExploreGenre = (genre) => {
        console.log(`Exploring genre: ${genre}`);
        // Future implementation: logic to show more songs of this genre
    };

    return (
        <div className={`min-h-screen bg-black font-inter py-8 px-4 md:px-8 lg:px-16 pb-8`}>
            {/* Removed: Loading spinner conditional rendering */}
            <>
                {/* Home View: Displays various categories of music */}
                <div className={`${currentView === 'home' ? 'block' : 'hidden'} bg-black text-white rounded-xl shadow-2xl`}>
                    {/* Listen Again Section */}
                    <HorizontalScrollContainer title="Listen again" id="listen-again-section"> {/* Removed animation-delay */}
                        {songs.slice(0, 5).map((song, index) => (
                            <ContentCard key={song.id} item={song} type="song" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                        ))}
                    </HorizontalScrollContainer>

                    {/* Similar Artists Section */}
                    <HorizontalScrollContainer title="Similar to" id="similar-artists-section"> {/* Removed animation-delay */}
                        {artists.slice(0, 6).map((artist, index) => (
                            <ContentCard key={artist.id} item={artist} type="artist" onClick={handleSelectArtist} index={index} showHoverOverlay={true} />
                        ))}
                    </HorizontalScrollContainer>

                    {/* Albums for You Section */}
                    <HorizontalScrollContainer title="Albums for you" id="albums-for-you-section"> {/* Removed animation-delay */}
                        {albums.slice(0, 5).map((album, index) => (
                            <ContentCard key={album.id} item={album} type="album" onClick={handleSelectAlbum} index={index} showHoverOverlay={true} />
                        ))}
                    </HorizontalScrollContainer>

                    {/* Hip-hop Genre Section */}
                    <HorizontalScrollContainer title="Hip-hop" id="hiphop-section" linkText="More" onLinkClick={() => handleExploreGenre('Hip-hop')}> {/* Removed animation-delay */}
                        {songs.filter(s => s.genre === 'Hip-hop').slice(0, 5).map((song, index) => (
                            <ContentCard key={song.id} item={song} type="track" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                        ))}
                    </HorizontalScrollContainer>

                    {/* Radios for You Section */}
                    <HorizontalScrollContainer title="Radios for you" id="radios-section"> {/* Removed animation-delay */}
                        {radios.slice(0, 6).map((radio, index) => (
                            <ContentCard key={radio.id} item={radio} type="radio" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                        ))}
                    </HorizontalScrollContainer>

                    {/* Featured Playlists Section */}
                    <HorizontalScrollContainer title="Featured Playlists" id="featured-playlists-section"> {/* Removed animation-delay */}
                        {playlists.slice(0, 5).map((playlist, index) => (
                            <ContentCard key={playlist.id} item={playlist} type="playlist" onClick={() => console.log('Playlist clicked:', playlist.title)} index={index} showHoverOverlay={true} />
                        ))}
                    </HorizontalScrollContainer>
                </div>

                {/* Artist Profile View: Displays details about a selected artist */}
                <div className={`${currentView === 'artist-profile' ? 'block' : 'hidden'} bg-black p-4 md:p-8 rounded-xl shadow-2xl`}>
                    {/* Back button to return to the home view */}
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
                            {/* Artist Header Section with cover image and profile details */}
                            <section
                                className="relative w-full h-80 flex items-end p-8 bg-cover bg-center rounded-b-xl shadow-2xl"
                                style={{ backgroundImage: `url(${selectedArtist.coverImage})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0 rounded-b-xl"></div>
                                <div className="relative z-10 flex items-center gap-6">
                                    <img
                                        src={selectedArtist.profileImage}
                                        alt={selectedArtist.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-lg" // Removed animate-scaleIn
                                    />
                                    <div>
                                        <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg"> {/* Removed opacity and animation classes */}
                                            {selectedArtist.name}
                                        </h1>
                                        <p className="text-lg text-gray-300"> {/* Removed opacity and animation classes */}
                                            {selectedArtist.genre}
                                        </p>
                                        <button
                                            // Play the first song by the artist if available
                                            onClick={() => songs.filter(song => song.artist === selectedArtist.name).length > 0 && handlePlayTrack(songs.filter(song => song.artist === selectedArtist.name)[0])}
                                            className="mt-4 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-md font-bold" // Removed opacity and animation classes
                                        >
                                            PLAY ALL
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Popular Tracks by Artist Section */}
                            <section className="py-12 px-4 md:px-8 lg:px-16">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow"> {/* Removed opacity and animation classes */}
                                        Popular <span className="text-red-500">Tracks</span>
                                    </h2>
                                </div>
                                <div className="flex overflow-x-auto space-x-6 pb-4 horizontal-scroll-container relative">
                                    {songs.filter(song => song.artist === selectedArtist.name)
                                        .sort((a, b) => parseInt(b.views) - parseInt(a.views)).slice(0, 6) // Sort by views and take top 6
                                        .map((track, index) => (
                                            <ContentCard key={track.id} item={track} type="track" onClick={handlePlayTrack} index={index} showHoverOverlay={true} />
                                        ))}
                                </div>
                            </section>

                            {/* All Tracks by Artist Section */}
                            <section className="py-12 px-4 md:px-8 lg:px-16">
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white drop-shadow"> {/* Removed opacity and animation classes */}
                                    All <span className="text-red-500">Tracks</span> by {selectedArtist.name}
                                </h2>
                                <div className="border-t border-gray-800 pt-6 mb-12 max-h-96 overflow-y-auto custom-scrollbar">
                                    {songs.filter(song => song.artist === selectedArtist.name).length > 0 ? (
                                        songs.filter(song => song.artist === selectedArtist.name).map((track, index) => (
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
                                        <p className="text-gray-500 text-center py-8">No tracks found for this artist.</p>
                                    )}
                                </div>
                            </section>

                            {/* Albums by Artist Section */}
                            <section className="py-12 px-4 md:px-8 lg:px-16">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-6"> {/* Removed opacity and animation classes */}
                                    Albums by <span className="text-purple-500">{selectedArtist.name}</span>
                                </h2>
                                <div className="flex overflow-x-auto space-x-6 pb-4 horizontal-scroll-container">
                                    {albums.filter(album => album.artist === selectedArtist.name).map((album, index) => (
                                        <ContentCard key={album.id} item={album} type="album" onClick={handleSelectAlbum} index={index} showHoverOverlay={true} />
                                    ))}
                                </div>
                            </section>

                            {/* About Artist Section */}
                            <section className="py-12 px-4 md:px-8 lg:px-16">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-6"> {/* Removed opacity and animation classes */}
                                    About <span className="text-orange-500">{selectedArtist.name}</span>
                                </h2>
                                <div className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700"> {/* Removed opacity and animation classes */}
                                    <p className="text-lg text-gray-300 leading-relaxed">{selectedArtist.bio}</p>
                                </div>
                            </section>
                        </>
                    )}
                </div>

                {/* Album Songs View: Displays songs within a selected album */}
                <div className={`${currentView === 'album-songs' ? 'block' : 'hidden'} bg-black p-4 md:p-8 rounded-xl shadow-2xl`}>
                    {/* Back button to return to the artist profile or home */}
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
                            {/* Album Header Section */}
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

                            {/* Tracks within the Album Section */}
                            <div className="border-t border-gray-800 pt-6">
                                <h3 className="text-2xl font-bold text-white mb-4">Tracks</h3>
                                {songs.filter(song => song.album === selectedAlbum.title && song.artist === selectedAlbum.artist).length > 0 ? (
                                    songs.filter(song => song.album === selectedAlbum.title && song.artist === selectedAlbum.artist).map((track, index) => (
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
            </>

            {/* Tailwind CSS Script - MUST be included for Tailwind classes to work */}
            <script src="https://cdn.tailwindcss.com"></script>
        </div>
    );
};

export default Musicpage;
