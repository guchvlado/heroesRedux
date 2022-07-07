import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4} from 'uuid';
import { heroesAdd } from '../heroesList/heroesSlice'
import { useHttp } from "../../hooks/http.hook";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('fire');

    const dispatch = useDispatch();
    const {request} = useHttp();

    const addHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        };
        request('http://localhost:3001/heroes', "POST", JSON.stringify(newHero))
            .then(() => dispatch(heroesAdd(newHero)))
            .catch((err) => console.log(err));

        setName('');
        setDescription('');
        setElement('');
    }

    // const {filters} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={addHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option disabled >Я владею элементом...</option>
                    {filters.map(item => item.name === 'all' ? null : <option key={item.name} value={item.name}>{item.translate}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;