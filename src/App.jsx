import React, { useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar/SearchBar'
import Button from './Button/Button'
import SearchResults from './SearchResults/SearchResults'
import Playlist from './Playlist/Playlist'
import { Spotify } from './spotifyApi'

export default function App() {
  const [songName, setSongName] = useState('')
  const [filteredSongs, setFilteredSongs] = useState([])
  const [playlist, setPlaylist] = useState([])
  const [playlistName, setPlaylistName] = useState('')
  const [searchClicked, setSearchClicked] = useState(false)


  const updateSong = (event) => {
    setSongName(event.target.value)
  }

  const filterSongs = async () => {
    if (songName.trim() === '') {
      setFilteredSongs([])
    } else {
      const filtered = await Spotify.search(songName)
      setFilteredSongs(filtered || [])
    }
    setSearchClicked(true)
  }

  const addTrackToPlaylist = (track) => {
    const trackId = `${track.name}-${track.artist}`
    setPlaylist((prevPlaylist) => {
      if (!prevPlaylist.some(t => `${t.name}-${t.artist}` === trackId)) {
        return [...prevPlaylist, track]
      }
      return prevPlaylist
    })
  }

  const removeTrackFromPlaylist = (index) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((_, i) => i !== index))
  }

  const savePlaylist = () => {
    const trackUris = playlist.map(track => track.uri)
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylist([])
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      filterSongs()
    }
  }

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

// export default App
