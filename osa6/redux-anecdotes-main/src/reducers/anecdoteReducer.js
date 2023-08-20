import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      const id = action.payload
      return state.map(a => {
        if (a.id === id) {
          return { ...a, votes: a.votes + 1 }
        }
        return a
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToBeUpdated = anecdotes.find(a => a.id === id)
    const newObject = {...anecdoteToBeUpdated, votes: anecdoteToBeUpdated.votes + 1}
    await anecdoteService.update(id, newObject)
    dispatch(incrementVote(id))
  }
}

export const { appendAnecdote, incrementVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer