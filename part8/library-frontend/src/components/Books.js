const Books = ({show, books, allgenres, genreChoice, setGenreChoice}) => {

  if (!show) {
    return null
  }
  
  console.log('genres: ', allgenres)
  console.log('genreChoises: ', genreChoice)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allgenres.map((genre) => (
          <button key={genre} onClick={() => setGenreChoice(genre)} value={genre}>{genre}</button>  
          ))
        }
        <button onClick={() => setGenreChoice(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
