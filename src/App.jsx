import React, { useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar/SearchBar'
import Button from './Button/Button'
import SearchResults from './SearchResults/SearchResults'
import Playlist from './Playlist/Playlist';

function App() {
  return (
    <div className='appContainer'>
      <header>Jammin'</header>
      <SearchBar 
      placeHolder="Enter a song or artist..."
      value={songName}
      inputHandler={updateSong}
      onKeyDown={handleKeyDown}/>
      <Button 
      text={<> Search <FontAwesomeIcon icon={faMagnifyingGlass} className='icon'/></>} 
      handleFunction={filterSongs} />
      <div className='bottomContainer'>
        <SearchResults addTrackToPlaylist={addTrackToPlaylist} 
        songs={searchClicked ? filteredSongs : []}
        searchClicked={searchClicked}/>
        <Playlist playlist={playlist} removeTrackFromPlaylist={removeTrackFromPlaylist}
        savePlaylist={savePlaylist}
        updatePlaylistName={setPlaylistName}/>
      </div>
    </div>
  )
}

export default App
