import PropTypes from 'prop-types';

const CountryDataDisplay = ({ selectedCountry, temp, weatherEmoji, weatherDescription, windSpeed }) => { 
    return (
    <>
        <h2>{selectedCountry.name.common}</h2>
        <img src={selectedCountry.flags.png} alt="flag" width="150" height="100"/>
        <p>Capital: {selectedCountry.capital[0]}</p>
        <p>Population: {selectedCountry.population}</p>
        <p>Languages: {Object.values(selectedCountry.languages).map((language, index) => <li key={index}>{language} </li>)}</p>
        <h3>Current Weather in {selectedCountry.capital[0]}</h3>
        <p>Temperature: {temp}°C</p>
        <img src={weatherEmoji} alt="weather icon"/>
        <p>{weatherDescription}</p>
        <p>wind {windSpeed} m/s</p>
    </>
    )
}

CountryDataDisplay.propTypes = {
    selectedCountry: PropTypes.object.isRequired,
    temp: PropTypes.string,
    weatherEmoji: PropTypes.string,
    weatherDescription: PropTypes.string,
    windSpeed: PropTypes.number
}

export default CountryDataDisplay;