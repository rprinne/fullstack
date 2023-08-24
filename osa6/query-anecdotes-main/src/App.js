import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateMutation = useMutation(
    updateAnecdote,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    }
  )
  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({type: 'set', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      dispatch({type: 'clear'})
    }, 5000)
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    { retry: false }
  )

  if ( result.isLoading ) {
    return <div>leading data...</div>
  }
  
  if (result.isSuccess) {
    const anecdotes = result.data
    return (
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
    )
  }

  return <div>anecdote service not available due to problems in server</div>
}

export default App
