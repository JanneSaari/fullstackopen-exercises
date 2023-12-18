import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVoteFor(state, action) {
      const id = action.payload
      const objectToChange = state.find(anecdote => anecdote.id === id)
      let changedObject = { ...objectToChange }
      changedObject.votes += 1
      console.log('changed object', changedObject)
      return state.map(anecdote => 
        anecdote.id !== action.payload ? anecdote : changedObject)
    },
    addNewAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVoteFor, addNewAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer