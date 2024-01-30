const Books = ({books, allgenres, genreChoice, setGenreChoice}) => {
  console.log('genres: ', allgenres)
  console.log('genreChoises: ', genreChoice)

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books}/>

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

export const BooksTable = ({books}) => {
  if(!books){
    return null
  }

  console.log(books)

  return (
    <div>
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
    </div>
  )
}

export default Books
