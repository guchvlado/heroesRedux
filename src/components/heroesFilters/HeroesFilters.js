import { useEffect } from "react";
import { activeFilterChange, filtersFetch, selectAll } from "./filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import store from '../../store';

const HeroesFilters = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetch()) // eslint-disable-next-line
    }, [])

    const { activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())

    const clickFilterHandler = (filterName) => {
        dispatch(activeFilterChange(filterName))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(item => <button key={item.name} onClick={() => clickFilterHandler(item.name)} className={`btn ${item.classes} ${activeFilter === item.name ? "active" : null}`}>{item.translate}</button>)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;