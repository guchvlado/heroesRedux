
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect } from "react";
import { filtersFetched, heroesFilter } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => {throw new Error('filters error')}) // eslint-disable-next-line
    }, [])

    const {filters, activeFilter} = useSelector(state => state);

    const clickFilterHandler = (filterName) => {
        dispatch(heroesFilter(filterName))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {filters.map(item => <button key={item.name} onClick={() => clickFilterHandler(item.name)} className={`btn ${item.classes} ${activeFilter === item.name ? "active" : null}`}>{item.translate}</button>)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;