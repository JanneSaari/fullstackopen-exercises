const Phonebook = ({ people, deleteFn }) => {
    return (
        <ul>
        {people.map(person =>
            <Entry key={person.name} person={person} deleteFn={deleteFn}></Entry>)}    
        </ul>
    )
}

const Entry = ({ person, deleteFn }) => {
    return (
        <li>{person.name} : {person.number} <button type="button" onClick={() => {deleteFn(person)}}>Delete</button></li>
    )
}

export default Phonebook;