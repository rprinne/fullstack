import { useState } from "react"
import Notify from "./components/Notify"
import Authors from "./components/Authors"
import AuthorEditor from "./components/AuthorEditor"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import GenreSelection from "./components/GenreSelection"
import Recommendations from "./components/Rocommended"

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import { ME, ALL_GENRES, ALL_BOOKS_BY_GENRE, ALL_AUTHORS, BOOK_ADDED } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors");
  const [genre, setGenre] = useState("sauna")
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const bookResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre }
  })
  const authorResult = useQuery(ALL_AUTHORS)
  const genreResult = useQuery(ALL_GENRES)
  const userResult = useQuery(ME)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      client.refetchQueries({
        include: "active",
      })
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { token && <button onClick={() => setPage("recom")}>recommendations</button> }
        { token && <button onClick={() => setPage("add")}>add book</button> }
        { !token && <button onClick={() => setPage("login")}>login</button> }
        { token && <button onClick={logout}>logout</button> }
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} result={authorResult} setError={notify} />
      { token && <AuthorEditor show={page === "authors"} result={authorResult} setError={notify} /> }
      <Books show={page === "books"} result={bookResult} />
      <NewBook show={page === "add"} setError={notify} />
      <LoginForm show={page === "login"} setToken={setToken} setError={notify} setPage={setPage} />
      <GenreSelection show={page === "books"} result={genreResult} setGenre={setGenre}/>
      <Recommendations show={page === "recom"} result={userResult}/>
    </div>
  )
}

export default App