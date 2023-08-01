import { useState, useEffect } from 'react'

import PeopleService from './services/people'

import Phonebook from './components/Phonebook'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import Notification from './components/Notification'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)
  const notificationTime = 5000
  let notificationTimeoutID


  useEffect(() => {
    PeopleService.getAll()
      .then(response => {
        setPeople(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber
    }
    if(people.map(x => x.name.toLocaleLowerCase()).indexOf(newName.toLocaleLowerCase()) === -1){
      PeopleService.addPerson(person)
        .then(response => {
          console.log(response);
          setPeople(people.concat(response))
          setNewName('')
          setNewNumber('')
          createNotification(`${person.name} succesfully added to the phonebook!`)
        })
        .catch(error => {
          console.log(error)
          alert("Adding new person failed")
        })
    }
    else{
      if(window.confirm(`Person ${newName} is already in the phonebook. Do you want to update their number?`)){
        person.id = people.find(x => x.name === newName).id
        if(person.id){
          PeopleService.updatePerson(person)
          .then(response => {
            createNotification(`${person.name}'s number updated!`)
            setPeople(people.map(person => person.name !== newName ? person : response))
          })
          .catch(error => {
            console.log(error)
          })
        }
        else{
          console.log("Something went wrong with updating data", person)
        }
      }
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

  const handleDeleting = (person) => {
    const id = person.id
    console.log("Delete: ", id)
    PeopleService.getPerson(id).then(x => {
      console.log(x)
      if(window.confirm(`Are you sure you want to delete person ${x.name}`)){
        console.log("Deleting...")
        PeopleService.removePerson(id)
        .then(response => {
          console.log(`Person: ${x.name} successfully deleted`)
          createNotification(`Person: ${x.name} successfully deleted`)

          PeopleService.getAll()
          .then(response => setPeople(response))})
        }
      })
        .catch(error => {
          createNotification(`Person: ${person.name} could not be found! He might be already deleted!`, true)
    })
  }


  const createNotification = (message, errorBool = false) => {
    console.log(message)
    setNotification(message)
    setIsError(errorBool)
    clearTimeout(notificationTimeoutID)
    notificationTimeoutID = setTimeout(() => {
      setNotification("")
    }, notificationTime)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError}></Notification>
      <h3>Add new person</h3>
      <AddPersonForm addPersonFn={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></AddPersonForm>
      <h3>Filter names</h3>
      <FilterForm filterFn={handleFilterChange} filter={filter}></FilterForm>
      <h3>Numbers</h3>
      <Phonebook people={people.map(person => person)
        .filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))}
        deleteFn={handleDeleting}></Phonebook>
    </div>
  )

}

export default App