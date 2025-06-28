import React, { useState } from 'react'; // Import useState
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Homepage from './components/Home.jsx';
import Musicpage from './components/Music.jsx'; // Now expects setCurrentPlayingSong prop
import AlbumsPage from './components/Album.jsx'; // Assuming these will also play music
import ArtistsPage from './components/Artist.jsx'; // Assuming these will also play music
import MusicPlayer from './components/MusicPlayer.jsx'; // Corrected spelling

// A new layout component that includes Navbar and MusicPlayer
function LayoutWithNavbarAndPlayer({ currentPlayingSong, setCurrentPlayingSong }) {
  return (
    <>
      <Navbar />
      {/* The Outlet renders the nested route's component (e.g., Musicpage) */}
      <Outlet context={{ setCurrentPlayingSong }} />
      {/* The MusicPlayer is rendered here, receiving the global currentPlayingSong state */}
      <MusicPlayer initialSong={currentPlayingSong} />
    </>
  );
}

// This component will include the Navbar and the Outlet for child routes,
// but NOT the MusicPlayer directly.
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  // Lift the currentPlayingSong state up to the common ancestor (App)
  const [currentPlayingSong, setCurrentPlayingSong] = useState(null);

  return (
    <Routes>
      {/* Homepage Route: Does NOT include the LayoutWithNavbarWithPlayer */}
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<Homepage />} />
      </Route>

      {/* Routes that WILL include the Navbar AND the MusicPlayer */}
      <Route element={<LayoutWithNavbarAndPlayer currentPlayingSong={currentPlayingSong} setCurrentPlayingSong={setCurrentPlayingSong} />}>
        {/* Pass setCurrentPlayingSong to pages that need to trigger music playback */}
        <Route path="/music" element={<Musicpage setCurrentPlayingSong={setCurrentPlayingSong} />} />
        <Route path="/albums" element={<AlbumsPage setCurrentPlayingSong={setCurrentPlayingSong} />} />
        <Route path="/artist" element={<ArtistsPage setCurrentPlayingSong={setCurrentPlayingSong} />} />
        {/* Add more routes that need the music player */}
      </Route>
    </Routes>
  );
}
