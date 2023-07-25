const AddPersonForm = ({handleNameChange, handleNumberChange, addPersonFn, newName, newNumber}) => {
    return(
        <form onSubmit={addPersonFn}>
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
    )
}

export default AddPersonForm