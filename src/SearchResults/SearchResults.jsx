import React, { useState } from "react";
import styles from './SearchResults.module.css'
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
 return (
  <div className={styles.searchResultsDiv}>
    <h1>Results</h1>
    <Tracklist />
  </div>
 )
}

export default SearchResults