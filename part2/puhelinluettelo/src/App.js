import { useState } from 'react'

import Phonebook from './components/Phonebook'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.map(x => x.name).indexOf(newName) === -1){
      setPersons(persons.concat(person));
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
      <h3>Filter names</h3>
      <FilterForm filterFn={handleFilterChange} filter={filter}></FilterForm>
      <h3>Add new person</h3>
      <AddPersonForm addPersonFn={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></AddPersonForm>
      <h2>Numbers</h2>
      <Phonebook people={persons.map(person => person).filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))}></Phonebook>
    </div>
  )

}

export default App