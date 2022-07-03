

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4} from 'uuid';

import { heroesAdd, heroesFetchingError } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

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
        dispatch(heroesAdd(newHero));
        request('http://localhost:3001/heroes', "POST", JSON.stringify(newHero))
            .catch(() => dispatch(heroesFetchingError()))
    }

    const {filters} = useSelector(state => state);

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
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {filters.filter(item => item.name !== 'all').map(item => <option key={item.name} value={item.name}>{item.translate}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;