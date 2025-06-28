import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Homepage from './components/Home.jsx'
import Musicpage from './components/Music.jsx'
import AlbumsPage from './components/Album.jsx'
import ArtistsPage from './components/Artist.jsx'
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/music" element={<Musicpage />}/>
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/artist" element={<ArtistsPage />} />
        {/* add more routes */}
      </Route>
    </Routes>
  )
}
