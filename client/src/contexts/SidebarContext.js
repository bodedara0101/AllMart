import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  value:  false,
};

// Create a slice
const Sidebar = createSlice({
  name: "isSidebarOpen",
  initialState, 
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
  },
});

// Export actions
export const { toggleSidebar } = Sidebar.actions;


export default Sidebar.reducer;