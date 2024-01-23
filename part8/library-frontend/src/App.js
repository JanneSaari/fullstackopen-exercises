import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"

const App = () => {
  const [page, setPage] = useState('authors')
  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {authorsQuery.loading 
        ? <div>loading...</div>
        : <Authors show={page === 'authors'} authors={authorsQuery.data.allAuthors} />
      }
      {booksQuery.loading
        ? <div>loading...</div>
        : <Books show={page === 'books'} books={booksQuery.data.allBooks} />
      }

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
