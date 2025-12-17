import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
};

// Create a slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    clearUser: (state) => {
        state.user = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;


export default userSlice.reducer;
