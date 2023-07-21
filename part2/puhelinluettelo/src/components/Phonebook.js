const Phonebook = ({people}) => {
    console.log(people);
    return (
        <ul>
        {people.map(person =>
            <li key={person.name}>{person.name}</li>)}
        </ul>
    )
}

const Entry = ([name]) => {
    return (
        <li key={name}>{name}</li>
    )
}

export default Phonebook;