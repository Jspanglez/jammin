import React, { useState } from "react";
import styles from './Track.module.css'
import Button from "../Button/Button";

function Track(props) {
 return (
  <div className={styles.trackDiv}>
    <h2>{props.name}</h2>
    <Button 
    text="+"
    className={styles.addButton}/>
    <h3>{props.artist}</h3>
    <hr />
  </div>
 )
}

export default Track