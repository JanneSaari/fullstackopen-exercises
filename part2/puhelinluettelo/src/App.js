import { useState, useEffect } from 'react'

import PeopleService from './services/people'
import Phonebook from './components/Phonebook'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  const peopleUrl = 'http://localhost:3001/persons';

  useEffect(() => {
    PeopleService.getAll()
      .then(response => {
        setPeople(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber
    }
    if(people.map(x => x.name).indexOf(newName) === -1){
      PeopleService.addPerson(person)
        .then(response => {
          console.log(response);
          setPeople(people.concat(response))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
          alert("Adding new person failed")
        })
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

  const handleDeleting = (id) => {
    console.log("Delete: ", id)
    if(window.confirm("Testi")){
      console.log("Deleting...")
      PeopleService.removePerson(id)
        .then(response => {
          console.log(`Person:${id} successfully deleted`, response)
          PeopleService.getAll()
          .then(response => setPeople(response))})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add new person</h3>
      <AddPersonForm addPersonFn={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></AddPersonForm>
      <h3>Filter names</h3>
      <FilterForm filterFn={handleFilterChange} filter={filter}></FilterForm>
      <h3>Numbers</h3>
      <Phonebook people={people.map(person => person).filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))} deleteFn={handleDeleting}></Phonebook>
    </div>
  )

}

export default App