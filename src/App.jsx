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
      <SearchBar placeHolder="Enter a song..."/>
      <Button text={<> Search <FontAwesomeIcon icon={faMagnifyingGlass} className='icon'/></>} />
      <div className='bottomContainer'>
        <SearchResults />
        <Playlist />
      </div>
    </div>
  )
}

export default App
