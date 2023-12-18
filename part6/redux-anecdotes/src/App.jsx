import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()  
  useEffect(() => {
    anecdoteService     
    .getAll().then(anecdotes => 
      dispatch(setAnecdotes(anecdotes)))  
    }, [])

  return (
    <div>
      <Notification></Notification>
      <h3>Filter</h3>
      <Filter></Filter>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App