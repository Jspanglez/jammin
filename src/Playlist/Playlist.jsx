import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button/Button";
import styles from './Playlist.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

function Playlist(props) {
  const [name, setName] = useState('')

  const updateSongName = (event) => {
    setName(event.target.value)
    props.updatePlaylistName(event.target.value)
  }
  
  return (
    <div className={styles.playlistContainer}>
      <SearchBar 
      placeHolder="Playlist name"
      value={name}
      inputHandler={updateSongName}
      className={styles.playlistName}/>
      <div>
        {props.playlist.map((track, index) => (
          <div key={index} className={styles.track}>
            <h2>{track.name}</h2>
            <Button 
            text="-"
            handleFunction={() => props.removeTrackFromPlaylist(index)}
            className={styles.removeButton}/>
            <h3>{track.artist}</h3>
            <h3>{track.album}</h3>
            <hr />
          </div>
        ))}
      </div>
      <Button 
      text={<>Save to Spotify <FontAwesomeIcon icon={faSpotify} /></>} 
      className={styles.saveButton}
      handleFunction={props.savePlaylist}/>
    </div>
  )
}

export default Playlist