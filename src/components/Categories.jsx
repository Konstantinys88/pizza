function Categories({ indexCategories, onClickCategories, setTitle }) {
    const categories = ['Все', 'Мясные', 'Вегетарианские', ' Гриль', 'Острые', 'Закрытые'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                onClickCategories(index);
                                setTitle(item);
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
