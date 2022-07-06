import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createSelector} from 'reselect';

import { fetchHeroes } from '../../actions';
import {heroesDelete} from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    // const filteredHeroes = useSelector(({heroes, filters}) => {
    //     console.log('render')
    //     if (filters.activeFilter === 'all') return heroes.heroes;
    //     return heroes.heroes.filter(item => item.element === filters.activeFilter)
    // })
    const filteredHeroesSelector = createSelector(
        (state) => state.heroes.heroes,
        (state) => state.filters.activeFilter,
        (heroes, activeFilter) => {
            if (activeFilter === 'all') return heroes;
                return heroes.filter(item => item.element === activeFilter)
        }
    );
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request))

        // eslint-disable-next-line
    }, []);

    const deleteHandler = useCallback((id) => {
        request("http://localhost:3001/heroes/" + id, 'DELETE')
            .then(() => dispatch(heroesDelete(id)))
            .catch((err) => console.log(err))
            // eslint-disable-next-line
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem clickHandler={() => deleteHandler(id)} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;