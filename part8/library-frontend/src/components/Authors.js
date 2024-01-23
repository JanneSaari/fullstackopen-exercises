import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries"

const Authors = (props) => {
  const [author, setAuthor] = useState(null)
  const [birthyear, setBirthyear] = useState()

  const [changeBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{query:ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const updateBirthyear = (event) => {
    event.preventDefault()

    const birthyearInt = Number(birthyear)
    console.log('author: ', author, 'birthyear', birthyear)
    changeBirthyear({ variables: {author, birthyear: birthyearInt}})

    setAuthor('')
    setBirthyear('')
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <div>
        <form onSubmit={updateBirthyear}>
          <select onChange={handleAuthorChange}>
            {authors.map(author => 
              <option key={author.name} value={author.name}>{author.name}</option>  
            )}
          </select>
          <div>
          Birthyear
          <input
            type="number"
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <div>
          <button type="submit">update</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Authors
