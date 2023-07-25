import { useState, useEffect } from 'react'
import axios from 'axios'

import Phonebook from './components/Phonebook'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPeople(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber
    }
    if(people.map(x => x.name).indexOf(newName) === -1){
      setPeople(people.concat(person));
      setNewName('');
      setNewNumber('');
    }
    else{
      alert(`${newName} is already added to the phonebook`);
    }
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add new person</h3>
      <AddPersonForm addPersonFn={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></AddPersonForm>
      <h3>Filter names</h3>
      <FilterForm filterFn={handleFilterChange} filter={filter}></FilterForm>
      <h3>Numbers</h3>
      <Phonebook people={people.map(person => person).filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))}></Phonebook>
    </div>
  )

}

export default App