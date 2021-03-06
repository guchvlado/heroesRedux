import {configureStore} from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';
import { apiSlice } from '../api/apiSlice';
//import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
//import ReduxThunk from 'redux-thunk';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }
//     return store;
// }

// const store = createStore(
//     combineReducers({heroes, filters}), 
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleware), 
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = configureStore({
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer, heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;