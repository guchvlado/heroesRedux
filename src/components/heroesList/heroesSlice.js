import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroesAdd: (state, action) => {
            state.heroes.push(action.payload);
            state.heroesLoadingStatus = 'added';
        },
        heroesDelete: (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
            state.heroesLoadingStatus = 'deleted';
        }
    }
})

const {actions, reducer} = heroes;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesAdd,
    heroesDelete,
    heroesFetchingError
} = actions;