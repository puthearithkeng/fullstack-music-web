import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Homepage from './components/Home.jsx';
import Musicpage from './components/Music.jsx';
import AlbumsPage from './components/Album.jsx';
import ArtistsPage from './components/Artist.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import FavoritePage from './components/favorite.jsx';
import { DataProvider, useData } from './components/datacontext.jsx'; // Import DataProvider and useData

// Layout with Navbar and Music Player
// This component now receives currentPlayingSong and allSongs directly from its parent (App)
// and passes setCurrentPlayingSong and allSongs to its Outlet children.
function LayoutWithNavbarAndPlayer({ currentPlayingSong, setCurrentPlayingSong, allSongs }) {
  return (
    <>
      <Navbar />
      {/* Provide context to children so they can trigger playback and access allSongs */}
      <Outlet context={{ setCurrentPlayingSong, allSongs }} />
      {/* Pass both currentPlayingSong and allSongs to MusicPlayer */}
      <MusicPlayer
        initialSong={currentPlayingSong}
        allSongs={allSongs}
        setCurrentPlayingSong={setCurrentPlayingSong}
      />
    </>
  );
}

// Layout with Navbar only (no Music Player)
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// Main App Component
export default function App() {
  const [currentPlayingSong, setCurrentPlayingSong] = useState(null);
  // State to hold all songs, which will be populated from DataContext
  const [allSongs, setAllSongs] = useState([]);

  return (
    // Wrap the entire application with DataProvider to make context data available globally
    <DataProvider>
      <AppContent
        currentPlayingSong={currentPlayingSong}
        setCurrentPlayingSong={setCurrentPlayingSong}
        allSongs={allSongs}
        setAllSongs={setAllSongs}
      />
    </DataProvider>
  );
}

// Separate component to consume context and manage routes, allowing DataProvider to wrap it
function AppContent({ currentPlayingSong, setCurrentPlayingSong, allSongs, setAllSongs }) {
  // Use the useData hook to get the songs from the DataContext
  const { songs: contextSongs } = useData();

  // Effect to populate allSongs state from the DataContext once it's available
  useEffect(() => {
    if (contextSongs && contextSongs.length > 0) {
      setAllSongs(contextSongs);
    }
  }, [contextSongs, setAllSongs]); // Re-run if contextSongs or setAllSongs changes

  return (
    <Routes>
      {/* Routes without Music Player */}
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<Homepage />} />
      </Route>

      {/* Routes with Music Player */}
      <Route
        element={
          <LayoutWithNavbarAndPlayer
            currentPlayingSong={currentPlayingSong}
            setCurrentPlayingSong={setCurrentPlayingSong}
            allSongs={allSongs} // Pass allSongs from App's state to LayoutWithNavbarAndPlayer
          />
        }
      >
        {/* Musicpage and other pages now get their data directly from DataContext via useData() */}
        <Route path="/music" element={<Musicpage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/artist" element={<ArtistsPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Route>
    </Routes>
  );
}
