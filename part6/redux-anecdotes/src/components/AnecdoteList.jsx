import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationreducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
    dispatch(setNotification(`You voted blog: ${id}`, 2000))
  }

  return (
    <div>
      <div>
        {anecdotes
          .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
          .toSorted((a, b) => a.votes < b.votes )
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                <div>
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default AnecdoteList