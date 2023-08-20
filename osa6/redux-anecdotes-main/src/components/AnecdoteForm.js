import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnectode = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(showNotification(`you added "${content}"`, 5))
  }
  return (
    <form onSubmit = { newAnectode }>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm