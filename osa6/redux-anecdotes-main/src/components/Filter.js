import { updateFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const filterChange = (event) => {
    event.preventDefault()
    dispatch(updateFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }
  return(
    <div style={style}>
      filter <input onChange={filterChange} />
    </div>
  )
}

export default Filter