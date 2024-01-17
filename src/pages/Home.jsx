import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const api = 'https://65a65e8d74cf4207b4efdc2c.mockapi.io/items';

    useEffect(() => {
        fetch(api)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='content__top'>
                <Categories />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading
                    ? [...new Array(12)].map((item, index) => <Skeleton key={index} />)
                    : items.map((obj) =>
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
