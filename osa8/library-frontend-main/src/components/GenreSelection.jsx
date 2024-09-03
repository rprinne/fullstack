const GenreSelection = (props) => {
  if (!props.show) {
    return null
  }

  let genres = []
  if (props.result.data.allGenres) {
    genres = props.result.data.allGenres
  }

  return (
    <div>
      { genres.map((g) => 
        (<button key={g} onClick={ () => props.setGenre(g)}> {g} </button>)
      ) }
      <button key={"_allGenres"} onClick={ () => props.setGenre("")}> all genres </button> 
    </div>
  )
}

export default GenreSelection