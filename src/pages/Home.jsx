import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [indexCategoriesSort, setIndexCategoritesSort] = useState(0);
    const [indexCategories, setIndexCategorites] = useState(0);

    let apiCategories = `rating`;
    let sortOrder = `desc`;
    if (indexCategoriesSort === 0) {
        apiCategories = `rating`;
        sortOrder = `desc`;
    } else if (indexCategoriesSort === 1) {
        apiCategories = `price`;
        sortOrder = `desc`;
    } else if (indexCategoriesSort === 2) {
        apiCategories = `title`;
        sortOrder = `asc`;
    }

    let api = `https://65a65e8d74cf4207b4efdc2c.mockapi.io/items?${
        indexCategories > 0 ? `category=${indexCategories}` : ''
    }&sortBy=${apiCategories}&order=${sortOrder}`;

    const onClickCategories = (index) => {
        setIndexCategorites(index);
    };

    const onClickCategoriesSort = (index) => {
        setIndexCategoritesSort(index);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(api)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
                console.log(json);
            });
        window.scrollTo(0, 0);
    }, [api]);

    return (
        <>
            <div className='content__top'>
                <Categories
                    onClickCategories={onClickCategories}
                    indexCategories={indexCategories}
                />
                <Sort
                    onClickCategoriesSort={onClickCategoriesSort}
                    indexCategoriesSort={indexCategoriesSort}
                />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading
                    ? [...new Array(12)]?.map((item, index) => <Skeleton key={index} />)
                    : items?.map((obj) =>
                          isLoading ? (
                              <Skeleton key={obj.id} />
                          ) : (
                              <PizzaBlock {...obj} key={obj.id} />
                          ),
                      )}
            </div>
        </>
    );
};

export default Home;
