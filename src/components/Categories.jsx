import { useState } from 'react';

function Categories() {
    let [categoriesActive, setCategoriesActive] = useState(0);

    const categories = ['Все', 'Мясные', 'Вегетарианские', ' Гриль', 'Острые', 'Закрытые'];

    const onClickCategories = (catigories) => {
        setCategoriesActive(catigories);
    };

    return (
        <div className='categories'>
            <ul>
                {categories.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => onClickCategories(index)}
                            className={categoriesActive === index ? 'active' : ''}
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
