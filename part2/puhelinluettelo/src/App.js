import { useState } from 'react'

import Phonebook from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName
    }
    if(persons.map(x => x.name).indexOf(newName) === -1){
      setPersons(persons.concat(person));
      setNewName('');
    }
    else{
      alert(`${newName} is already added to the phonebook`);
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook people={persons.map(person => person)}></Phonebook>
    </div>
  )

}

export default App