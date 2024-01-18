function Categories({ indexCategories, onClickCategories }) {
    const categories = ['Все', 'Мясные', 'Вегетарианские', ' Гриль', 'Острые', 'Закрытые'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => onClickCategories(index)}
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
