import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  value:  false,
};

// Create a slice
const Token = createSlice({
  name: "token",
  initialState, 
  reducers: {
    setToken: (state,action) => {
      state.value = action.payload;
    },
  },
});

// Export actions
export const { setToken } = Token.actions;


export default Token.reducer;