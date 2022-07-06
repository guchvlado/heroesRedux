import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeFilter: 'all',
    filters: []
}

const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChange: (state, action) => {state.activeFilter = action.payload},
        filtersFetched: (state, action) => {state.filters = action.payload}
    }
})

const {actions, reducer} = filters;

export default reducer;
export const {
    activeFilterChange,
    filtersFetched
} = actions;