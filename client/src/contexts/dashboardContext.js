import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  users: '',
  products: [],
  orders: [],
  revanue: "",
};

// Create a slice
const Dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setU: (state, action) => {
      state.users = action.payload;
    },
    setP: (state, action) => {
      state.products = action.payload;
    },
    setO: (state, action) => {
      action.payload.forEach((element) => {
        state.orders.push(element);
      });
    },
    setR: (state, action) => {
      state.revanue = action.payload;
    },
  },
});

// Export actions
export const { setU, setP, setO, setR } = Dashboard.actions;

export default Dashboard.reducer;
