const Phonebook = ({people}) => {
    console.log(people);
    return (
        <ul>
        {people.map(person =>
            <Entry name={person.name} number={person.number}></Entry>)}    
        </ul>
    )
}

const Entry = ({name, number}) => {
    return (
        <li key={name}>{name} : {number}</li>
    )
}

export default Phonebook;