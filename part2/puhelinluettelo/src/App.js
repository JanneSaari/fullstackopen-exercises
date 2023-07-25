import { useState } from 'react'

import Phonebook from './components/Phonebook'

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
      <input value={filter} onChange={handleFilterChange}></input>
      <h3>Add new person</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}></input>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook people={persons.map(person => person).filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))}></Phonebook>
    </div>
  )

}

export default App