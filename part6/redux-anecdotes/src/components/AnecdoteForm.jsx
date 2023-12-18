import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote: ', content)
    const newAnecdote = await anecdoteService.addNewAnecdote(content)
    dispatch(addNewAnecdote(newAnecdote))
    dispatch(addNotification(`You added new blog: ${content}`))
    setTimeout(() => {
      console.log('removing notification')
      dispatch(removeNotification())
    }, 5000);
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