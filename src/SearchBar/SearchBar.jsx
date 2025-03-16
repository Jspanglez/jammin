import React, { useState } from "react";
import styles from './SearchBar.module.css'

function SearchBar(props) {
  return (
    <input 
    type="text" 
    placeholder={props.placeHolder}
    value={props.value}
    onChange={props.inputHandler}
    onKeyDown={props.onKeyDown}
    className={`${styles.searchBar} ${props.className}`}/>
  )
}

export default SearchBar