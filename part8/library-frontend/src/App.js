import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books, { BooksTable } from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, CURRENT_USER } from "./queries"
import LoginForm from './components/LoginForm'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate, useNavigate
} from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(null)
  const [genreChoice, setGenreChoice] = useState(null)
  const [allGenres, setAllGenres] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const authorsQuery = useQuery(ALL_AUTHORS)
  const allBooksQuery = useQuery(ALL_BOOKS)
  const genreBooksQuery = useQuery(ALL_BOOKS, {
    variables: {genre: genreChoice}
  })
  const favoriteGenreBooks = useQuery(ALL_BOOKS, {
    variables: {genre: favoriteGenre}
  })
  const currentUser = useQuery(CURRENT_USER, {pollInterval: 500})
  const client = useApolloClient()
  const navigate = useNavigate()

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

  useEffect(() => {
    if(currentUser.loading){
      return
    }
    try {
      setFavoriteGenre(currentUser.data.me.favoriteGenre)
    } catch (error) {
      console.log(error)
      setFavoriteGenre(null)
    }
  }, [currentUser])

  const logout = () => {    
    console.log('logging out')
    setToken(null)
    localStorage.clear()
    client.resetStore() 
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate('/authors')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        {token
          ? <button onClick={() => navigate('/newbook')}>add book</button>
          : null
        }
        {token
          ? <button onClick={() => navigate('/recommendations')}>recommendations</button>
          : null
        }
        {token
          ? <button onClick={logout}>logout</button>
          : <button onClick={() => navigate('/login')}>login</button>
        }
      </div>

      <Routes>
        <Route path='/' element={<Navigate replace to='/authors'/>}/>
        <Route path='/login' element={token ? <Navigate replace to='/' /> :<LoginForm setToken={setToken}/>}/>
        <Route path='/authors' element={authorsQuery.loading 
          ? <div>loading...</div>
          : <Authors authors={authorsQuery.data.allAuthors} />}/>
        <Route path='/books' element={genreBooksQuery.loading 
          ? <div>loading...</div> 
          : <Books books={genreBooksQuery.data.allBooks} allgenres={allGenres} genreChoice={genreChoice} setGenreChoice={setGenreChoice} />}/>
        <Route path='/recommendations' element={!token 
          ? <Navigate replace to='/' /> 
          : favoriteGenreBooks.loading 
            ? <div>loading...</div>
            : <BooksTable books={favoriteGenreBooks.data.allBooks}/>}/>
        <Route path='/newbook' element={!token 
          ? <Navigate replace to='/' /> 
          :<NewBook/>}/>
      </Routes>
    </div>
  )
}

export default App
