import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button/Button";
import styles from './Playlist.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

function Playlist() {
  return (
    <div className={styles.playlistContainer}>
      <SearchBar 
      placeHolder="Playlist name"
      value={name}
      inputHandler={updateSongName}
      className={styles.playlistName}/>
    </div>
  )
}

export default Playlist