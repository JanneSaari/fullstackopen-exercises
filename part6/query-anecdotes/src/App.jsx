import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './notificationContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery({    
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log('result: ', JSON.parse(JSON.stringify(result)))
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },

  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data
  console.log('anecdotes: ', anecdotes)

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({type:'SET', payload:`You voted for ${anecdote.content}`})
    setTimeout(() => {
      notificationDispatch({type:'CLEAR'})
    }, 5000);
  }

  console.log('notification: ', notification)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
