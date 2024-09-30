import { useState, useEffect} from 'react'
import axios from 'axios'
import Search from './Components/Search'
import CountryFilter from './Components/CountryFilter'
import CountryDataDisplay from './Components/CountryDataDisply'

function App() {
  const [userQuery, setUserQuery] = useState('')  
  const [countries, setCountries ] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [temp, setTemp] = useState(null)  
  const [weatherEmoji, setWeatherEmoji] = useState(null)
  const [weatherDescription, setWeatherDescription] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const apiKey = import.meta.env.VITE_API_KEY;


  // Fetch country data
  useEffect(() => { 
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => {
      console.log('Error fetching data:', error)
    })
  }, [])
  
  // Fetch weather data
  useEffect(() => { 
    if (selectedCountry && selectedCountry.capital) {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${apiKey}`)
    .then(response => { 
      console.log(response.data)

      setTemp((response.data.main.temp - 273.15).toFixed(1))
      setWeatherEmoji(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`)
      setWeatherDescription(response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1))
      setWindSpeed(response.data.wind.speed)
    })
    .catch(error => { 
      console.log('Error fetching data:', error)
    })}

  }, [selectedCountry, apiKey])

  //Handle search
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase()
    setUserQuery(searchQuery)

    const matchingCountries = 
      countries.filter(country => 
        country.name.common.toLowerCase().includes(searchQuery))

    const matchingCountry = matchingCountries[0]

    if (matchingCountries.length > 10) {
      setFilteredCountries(["Too many countries match search"])
      setSelectedCountry(null)
    } else if (matchingCountries.length === 0) {
      setFilteredCountries(["No countries match search"])
      setSelectedCountry(null)
    } else if (matchingCountries.length === 1) {
      setFilteredCountries(matchingCountries)
      setSelectedCountry(matchingCountry)
    } else {
      setFilteredCountries(matchingCountries.slice(0,10))
      setSelectedCountry(null)
    }
}

  const handleShow = (country) => {
    setSelectedCountry(country)
    setUserQuery('')
  }

  return (
  <>
    <Search userQuery={userQuery} handleSearch={handleSearch}/>
    
    <div>
      {selectedCountry ? (
        <CountryDataDisplay 
          selectedCountry={selectedCountry}
          temp={temp}  
          weatherEmoji={weatherEmoji} 
          weatherDescription={weatherDescription} 
          windSpeed={windSpeed}/>
    ) : (
      <CountryFilter 
        filteredCountries={filteredCountries}
        handleShow={handleShow}
        />

    )}
    </div>
  </>
  )
} 

export default App
