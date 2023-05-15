const Filter = ({updateFilter}) => {
    return (
      <form>
        <div>
          filter shown with 
          <input 
            onChange={updateFilter}
          />
        </div>
      </form>
    )
  }

export default Filter