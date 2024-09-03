import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'

const Recommendations = (props) => {
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  let genre = ""
  if (props.result.data.me) {
    genre = props.result.data.me.favoriteGenre
  }

  const bookResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre }
  })

  if (bookResult.loading) {
    return <div>loading books...</div>
  }

  let books = []
  if (bookResult.data.allBooks) {
    books = bookResult.data.allBooks
  }

  return (
    <div>
      <h2>Recommended books in the genre {genre}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
