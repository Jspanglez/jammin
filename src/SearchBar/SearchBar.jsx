import React, { useState } from "react";
import styles from './SearchBar.module.css'

function SearchBar(props) {
  return (
    <input 
    type="text" 
    placeholder={props.placeHolder}
    className={`${styles.searchBar} ${props.className}`}/>
  )
}

export default SearchBar