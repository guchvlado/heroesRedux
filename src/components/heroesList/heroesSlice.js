import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const heroesFetch = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes")
    }
);

const heroes = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesAdd: (state, action) => {
            // state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload)
            state.heroesLoadingStatus = 'added';
        },
        heroesDelete: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
            // state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
            state.heroesLoadingStatus = 'deleted';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(heroesFetch.pending, (state) => {state.heroesLoadingStatus = 'loading'})
            .addCase(heroesFetch.fulfilled, (state, action) => {
                // state.heroes = action.payload;
                heroesAdapter.setAll(state, action.payload);
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(heroesFetch.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    selectAll,
    (state) => state.filters.activeFilter,
    (heroes, activeFilter) => {
        if (activeFilter === 'all') return heroes;
            return heroes.filter(item => item.element === activeFilter)
    }
);

const {actions, reducer} = heroes;

export default reducer;
export const {
    heroesAdd,
    heroesDelete,
} = actions;