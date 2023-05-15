  const Persons = ({filter, persons, removeName}) => {
    // Apply the filter
    let filtered = persons.filter(p => p.name.toUpperCase().includes(filter))
    return (
      <div>
        {filtered.map(p =>
          <p key={p.id}>
            {p.name} {p.number} <button onClick={()=>removeName(p)}>Delete</button>
          </p>)}
      </div>
    )
  }

export default Persons