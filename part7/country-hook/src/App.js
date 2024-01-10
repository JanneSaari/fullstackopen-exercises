import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
      const queryUrl = `${baseUrl}/name/${name}`
      axios
        .get(queryUrl)
        .then(resp => {
          console.log('resp: ', resp)
          const data = resp.data
          setCountry({
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png
          })
          console.log('country: ', country)
          if(resp.status === 200)
            setFound(true)
          if(resp.status === 404)
            setFound(false)
        })
        .catch(error => {
          console.log(error)
          setFound(false)
          setCountry(null)
          console.log('found: ', found)
          console.log('country: ', country)
        })
  }, [name])

  return { data: country, found }
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    console.log('returning null')
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App