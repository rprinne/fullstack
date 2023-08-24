import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdote = useMutation(
    createAnecdote,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('anecdotes')
        dispatch({type: 'set', payload: `${data.content} added`})
        setTimeout(() => {
          dispatch({type: 'clear'})
        }, 5000)
      },
      onError: (error) => {
        dispatch({type: 'set', payload: `${error.response.data.error}`})
        setTimeout(() => {
          dispatch({type: 'clear'})
        }, 5000)
      }
    }
  )

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdote.mutateAsync({ content, votes: 0 })
  }

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
