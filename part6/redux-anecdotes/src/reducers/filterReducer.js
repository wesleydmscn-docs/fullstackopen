import { createSlice } from "@reduxjs/toolkit"

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload || state
    }
  }
})

export const { filterAnecdotes } = filterReducer.actions
export default filterReducer.reducer