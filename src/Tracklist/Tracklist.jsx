import React, { useState } from "react";
import styles from './Tracklist.module.css'
import Track from '../Track/Track'

const songs = [
  {
    name: 'Not Like Us',
    artist: 'Kendrick Lamar'
  },
  {
    name: 'Gangnam Style',
    artist: 'Psy'
  },
  {
    name: 'Mr. Blue Sky',
    artist: 'Electric Light Orchestra'
  }
]

function Tracklist() {
  const songContainer = songs.map((song, index) => (
    <Track key={index} name={song.name} artist={song.artist} />
  ));
  return (
    songContainer
  )
}

export default Tracklist