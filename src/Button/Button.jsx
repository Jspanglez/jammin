import React, { useState } from "react";
import styles from './Button.module.css'

function Button(props) {
  return (
    <button 
    className={`${styles.button} ${props.className}`} 
    style={props.style}>
    {props.text}
    </button>
  )
}

export default Button