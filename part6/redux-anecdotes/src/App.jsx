import { useSelector, useDispatch } from 'react-redux'
import { addVoteFor } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteFor(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .toSorted((a, b) => a.votes < b.votes )
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App