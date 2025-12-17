import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userContext/userContext.slice.js';
import SidebarReducer from './SidebarContext.js';
import TokenReducer from './tokenContext.js';
import DashboardReducer from './dashboardContext.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    isSidebarOpen : SidebarReducer,
    token : TokenReducer,
    dashboard : DashboardReducer
  },
})