import { useDispatch } from 'react-redux';
import { titleFilter, pizzasFilter } from '../redux/slices/filterSlice';

function Categories({ indexCategories }) {
    const categories = ['Все', 'Мясные', 'Вегетарианские', ' Гриль', 'Острые', 'Закрытые'];

    const dispatch = useDispatch();

    return (
        <div className='categories'>
            <ul>
                {categories.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                dispatch(titleFilter(item));
                                dispatch(pizzasFilter(index));
                            }}
                            className={indexCategories === index ? 'active' : ''}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Categories;
