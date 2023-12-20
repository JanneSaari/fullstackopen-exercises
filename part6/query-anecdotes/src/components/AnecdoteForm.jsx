import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext, useReducer } from "react"
import NotificationContext from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      console.log('error: ', error)
      notificationDispatch({type:'SET', payload: 'too short blog name'})
      setTimeout(() => {
        notificationDispatch({type:'CLEAR'})
      }, 5000);
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({type:'SET', payload: `Added blog new blog: '${content}'`})
    setTimeout(() => {
      notificationDispatch({type:'CLEAR'})
    }, 5000);
  }

  console.log('mutation status: ', newAnecdoteMutation.status)

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
