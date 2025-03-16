import React, { useState } from "react";
import styles from './Track.module.css'
import Button from "../Button/Button";

function Track(props) {
  const handleButton = () => {
    props.addTrackToPlaylist({ id: props.id, name: props.name, artist: props.artist, album: props.album, uri: props.uri })
  }

  return (
    <div className={styles.trackDiv}>
      <h2>{props.name}</h2>
      <Button 
      text="+"
      handleFunction={handleButton}
      className={styles.addButton}/>
      <h3>{props.artist}</h3>
      <h3>{props.album}</h3>
      <hr />
    </div>
  )
}

export default Track