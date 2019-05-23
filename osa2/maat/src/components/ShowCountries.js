import React from "react";
import CountryName from "./CountryName";
import CountryDetails from "./CountryDetails";

const ShowCountries = ({ countries, searchWord }) => {
  if (searchWord.length === 0) {
    return <div>type in search word to filter countries</div>;
  } else if (countries.length === 0) {
    return <div>search did not find any matches</div>;
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  } else if (countries.length < 10) {
    return <ul>
      {countries.map(country => <CountryName key={country.name} country={country.name} />  )}
    </ul>
  } else {
    return <div>too many matches, specify the search word</div>;
  }
};

export default ShowCountries;