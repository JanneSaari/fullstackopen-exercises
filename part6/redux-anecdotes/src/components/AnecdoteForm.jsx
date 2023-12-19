import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationreducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote: ', content)
    dispatch(createNewAnecdote(content))
    dispatch(setNotification(`You added new blog: ${content}`, 5000))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={ addAnecdote }>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm