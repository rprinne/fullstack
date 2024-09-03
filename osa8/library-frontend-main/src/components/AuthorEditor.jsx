import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const AuthorEditor = (props) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e =>
        e.message).join('\n')
      props.setError(messages)
    }
  })

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  let authors = []
  if (props.result.data.allAuthors) {
    authors = props.result.data.allAuthors
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(name)
    updateAuthor({ variables: { name, born: parseInt(birthyear) } })

    setName('')
    setBirthyear('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name:
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map(a =>(
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born:
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorEditor