import { useState, useEffect } from 'react'

import CountryService from './services/CountryService';

import SearchField from './components/SearchField';
import CountryList from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")


  useEffect(() => {
    CountryService.getAll()
      .then(response => {
        setCountries(response)
        // console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleFilterChange = (event) => {
    // console.log('Filtering...')
    setFilter(event.target.value)
    // console.log(filter)
  }

  return (
    <div className="App">
      <SearchField filter={filter} handleFilterChange={handleFilterChange}></SearchField>
      <CountryList countries={countries} filter={filter}></CountryList>
    </div>
  );
}

export default App;
