import React, { createContext, useContext } from 'react';
import {
  albumsData,
  albumSongsData,
  allArtistsData,
  initialAllSongs,
  initialPlaylists,
  initialAllRadios,
  favoritesData, // Import favoritesData
} from './allsongdata'; // adjust path if needed

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider
      value={{
        albums: albumsData,
        albumSongs: albumSongsData,
        artists: allArtistsData,
        songs: initialAllSongs,
        playlists: initialPlaylists,
        radios: initialAllRadios,
        favorites: favoritesData, // Expose favoritesData through the context
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
