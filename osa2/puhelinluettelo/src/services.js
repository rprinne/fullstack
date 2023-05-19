import axios from 'axios'
const dbURL = '/api/persons'

const getAll = () => {
    const request = axios.get(dbURL)
    return request.then(res => res.data)
  }
  
  const create = (newObject) => {
    const request = axios.post(dbURL, newObject)
    return request.then(res => res.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${dbURL}/${id}`, newObject)
    return request.then(res => res.data)
  }

  const remove = (id) => {
    const request = axios.delete(dbURL + '/' + id)
    return request.then(res => res.data)
  }
  
  const dbService = { getAll, create, update, remove }
  export default dbService