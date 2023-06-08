const Filter = ({updateFilter}) => {
  return (
    <form>
      <div>
          find countries 
        <input onChange={updateFilter} />
      </div>
    </form>
  )
}

export default Filter