const Phonebook = ({people}) => {
    console.log(people);
    return (
        <ul>
        {people.map(person =>
            <Entry key={person.name} name={person.name} number={person.number}></Entry>)}    
        </ul>
    )
}

const Entry = ({name, number}) => {
    return (
        <li>{name} : {number}</li>
    )
}

export default Phonebook;