import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'
import countryService from './services'

function App() {
  const [filter, setFilter] = useState('')
  const [filterExact, setFilterExact] = useState(false)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getAll()
      .then(res => {
        setCountries(res)
      })
  }, [])

  return (
    <div className="App">
      <Filter updateFilter={
        (event)=>{
          setFilterExact(false)
          setFilter(event.target.value.toUpperCase())
        }
      }/>
      <ShowCountries
        countries={
          filterExact ?
            countries.filter(c => c.name.common.toUpperCase() === filter) :
            countries.filter(c => c.name.common.toUpperCase().includes(filter))
        }
        handleClick={
          (name)=>{
            setFilter(name.toUpperCase())
            setFilterExact(true)
          }
        }
      />
    </div>
  )
}

export default App
