import { useDispatch } from 'react-redux';
import { titleFilter } from '../redux/slices/filterSlice';

function Categories({ indexCategories, onClickCategories }) {
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
                                onClickCategories(index);
                                dispatch(titleFilter(item));
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
