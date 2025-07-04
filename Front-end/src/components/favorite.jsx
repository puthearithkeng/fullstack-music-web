import './Allstyle.css'
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import useOutletContext
import { useData } from './datacontext'; // Import useData hook
const FavoritePage = () => {
  // Get data from DataContext
  // Assuming 'favorites' is the key for favoritesData in your DataContext, and 'songs' for initialAllSongs
  const { songs, favorites } = useData();

  // Get setCurrentPlayingSong from the Outlet context provided by LayoutWithNavbarAndPlayer in App.jsx
  const { setCurrentPlayingSong } = useOutletContext();

  // For demonstration, we'll use a hardcoded user ID.
  // In a real application, this would come from an authentication context.
  const currentUserId = 'user-1';

  // State to hold the favorited songs
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    // Filter favorites for the current user using data from context
    const userFavorites = favorites.filter(fav => fav.userId === currentUserId);

    // Map favorite song IDs to their full song details using songs from context
    const detailedFavoriteSongs = userFavorites.map(fav => {
      return songs.find(song => song.id === fav.songId);
    }).filter(Boolean); // Filter out any undefined songs if an ID doesn't match

    setFavoriteSongs(detailedFavoriteSongs);

    // Inject global styles and animations similar to Music.jsx
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
  }, [currentUserId, songs, favorites]); // Re-run if currentUserId, songs, or favorites change

  // Handler for clicking a favorite song to play it
  const handlePlayFavoriteSong = (song) => {
    setCurrentPlayingSong(song); // Update global player state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 py-8 px-4 md:px-8 lg:px-16 pb-8 font-sans mt-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 text-center sm:text-left opacity-0 animate-fadeInUp animation-delay-100">
          <i className="fa-solid fa-heart text-red-500 mr-3"></i>
          Your Favorites
        </h1>

        {favoriteSongs.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-12 opacity-0 animate-fadeInUp animation-delay-200">
            <p className="mb-4">No favorite songs added yet.</p>
            <p>Start exploring and add some tunes to your collection!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-0 gap-y-2">
            {favoriteSongs.map((song, index) => (
              <div
                key={song.id}
                className={`group flex-shrink-0 w-40 sm:w-48 bg-gray-900 p-3 rounded-xl shadow-xl border border-gray-800
                        transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500
                        transition-all duration-300 cursor-pointer relative overflow-hidden
                        opacity-0 animate-fadeInUp animation-delay-${(index + 1) * 100 + 200}`} // Staggered animation
                onClick={() => handlePlayFavoriteSong(song)} // Play song on click
              >
                <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden mb-3 shadow-lg">
                    <img
                        // Prioritize song.songArt if it exists, otherwise use song.albumArt
                        src={song.songArt || song.albumArt}
                        alt={`${song.title} Art`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/4a4a4a/e0e0e0?text=No+Image'; }}
                    />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold text-white mb-0.5 truncate w-full px-2">{song.title}</h3>
                  <p className="text-xs text-gray-400 truncate w-full px-2">{song.artist}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate w-full px-2">{song.album}</p>
                </div>
              </div>
            ))}
          </div>
        )}
       {/* Font Awesome for icons */}
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    </div>
  );
};

export default FavoritePage;
