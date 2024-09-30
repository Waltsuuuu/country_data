import PropTypes from 'prop-types'

const CountryFilter = ( {filteredCountries, handleShow} ) => {

  const isMessage = filteredCountries.length === 1 && typeof filteredCountries[0] === 'string';

    return (
    <div>
      {isMessage ? (
        <p>{filteredCountries[0]}</p>
      ) : (
        <div>
          {filteredCountries.map((country, index) => (
            <p key={index}>{country.name?.common || country}<button onClick={() => handleShow(country)}>show</button></p>
            // ?: optional chaining, if country.name is undefined, it will not throw an error
          ))}
        </div>
      )}
     </div> 
    )
}

CountryFilter.propTypes = {
    filteredCountries: PropTypes.array.isRequired,
    handleShow: PropTypes.func.isRequired
}

export default CountryFilter