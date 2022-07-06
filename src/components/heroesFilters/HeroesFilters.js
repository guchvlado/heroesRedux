import { useEffect } from "react";
import { fetchFilters } from "../../actions";
import { activeFilterChange } from "./filtersSlice";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request)) // eslint-disable-next-line
    }, [])

    const {filters, activeFilter} = useSelector(state => state.filters);

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