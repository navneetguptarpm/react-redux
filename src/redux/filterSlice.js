import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  priceRange: "all",
  rating: "all",
  sortBy: "default",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;

export const selectFilters = (state) => state.filters;

export default filterSlice.reducer;
