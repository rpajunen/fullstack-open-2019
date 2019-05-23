import React from "react";

const CountryDetails = ({ country }) => {
  console.log('country', country)
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <h2>
                {country.name} {country.nativeName}
              </h2>
            </td>
          </tr>
          <tr>
            <td>
              <div>Capital: {country.capital}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Population: {country.population}</div>
            </td>
          </tr>
          <tr>
            <td>
              <h2>Languages</h2>
              <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <img src={country.flag} alt="flag" width="200" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CountryDetails;