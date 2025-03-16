import React, { useState } from "react";
import styles from './Tracklist.module.css'
import Track from '../Track/Track'


function Tracklist(props) {
  if (props.searchClicked && (!props.songs || props.songs.length === 0)) {
    return <h2>No results found</h2>
  }

  const songContainer = props.songs.map((song, index) => (
    <Track 
    key={index} 
    id={index} 
    name={song.name} 
    artist={song.artist} 
    album={song.album}
    uri={song.uri}
    addTrackToPlaylist={props.addTrackToPlaylist}/>
  ))
  return (
    <div>
      {songContainer}
    </div>
  )
}

export default Tracklist