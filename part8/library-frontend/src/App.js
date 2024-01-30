import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genreChoice, setGenreChoice] = useState(null)
  const [allGenres, setAllGenres] = useState([])
  const authorsQuery = useQuery(ALL_AUTHORS)
  const allBooksQuery = useQuery(ALL_BOOKS)
  const genreBooksQuery = useQuery(ALL_BOOKS, {
    variables: {genre: genreChoice}
  })
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('user-token')
    if(storedToken){
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if(allBooksQuery.loading){
      return
    }
    let genres = []
    allBooksQuery.data.allBooks.forEach(book => book.genres.forEach((genre) => {
      if(!genres.includes(genre)){
        genres.push(genre)
      }
    }))
    setAllGenres(genres)
  }, [allBooksQuery])

  const logout = () => {    
    console.log('logging out')
    setToken(null)
    setPage('login')
    localStorage.clear()
    client.resetStore() 
  }

  console.log('genres: ', genreChoice)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <button onClick={() => setPage('add')}>add book</button>
          : null
        }
        {token
          ? <button onClick={logout}>logout</button>
          : null
        }
      </div>

      {token
        ? null
        : <LoginForm setToken={setToken}></LoginForm>
      }

      {authorsQuery.loading 
        ? <div>loading...</div>
        : <Authors show={page === 'authors'} authors={authorsQuery.data.allAuthors} />
      }
      {genreBooksQuery.loading
        ? <div>loading...</div>
        : <Books show={page === 'books'} books={genreBooksQuery.data.allBooks} allgenres={allGenres} genreChoice={genreChoice} setGenreChoice={setGenreChoice} />
      }

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
