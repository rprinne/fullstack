import { addNew } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnectode = (event) => {
    event.preventDefault()
    console.log(event.target.anecdote)
    const content = event.target.anectote.value
    dispatch(addNew(content))
  }
  return (
    <form onSubmit = { newAnectode }>
      <div><input name='anectote'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm