import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowCountries from "./components/ShowCountries";

const App = () => {
  const [searchWord, setSeachWord] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchWordChange = event => {
    setSeachWord(event.target.value)
  }

  const results = countries.filter(country => country.name.toLowerCase().includes(searchWord.toLowerCase()))

  return (
    <div>
      <div>
        <h1>Country Finder</h1>
        Find countries:
          <input
          value={searchWord}
          onChange={handleSearchWordChange}
        />
      </div>
      <div>
        <ShowCountries
          countries={results}
          searchWord={searchWord}
        />
      </div>
    </div>
  );
}


export default App;