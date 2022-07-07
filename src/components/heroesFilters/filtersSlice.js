import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//     activeFilter: 'all',
//     filtersLoadingStatus: 'idle',
//     filters: []
// }

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
});

export const filtersFetch = createAsyncThunk(
    'filtersFetch',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
);

const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChange: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(filtersFetch.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(filtersFetch.fulfilled, (state, action) => {
                // state.filters = action.payload;
                filtersAdapter.setAll(state, action.payload);
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(filtersFetch.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filters;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export default reducer;
export const {
    activeFilterChange
} = actions;