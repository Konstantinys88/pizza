import React, { useContext } from 'react';
import Pagination from '../components/Pagination';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';
import { AppContext } from '../App';
import { useSelector } from 'react-redux';

const Home = () => {
    const title = useSelector((state) => state.filter.title);

    const { searchValue } = useContext(AppContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [indexCategoriesSort, setIndexCategoritesSort] = useState(0);
    const [indexCategories, setIndexCategorites] = useState(0);
    const [curentPage, setCurentPage] = useState(1);

    let apiCategories = `rating`;
    let sortOrder = `desc`;
    // const search = searchValue ? `&search=${searchValue}` : '';

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

    let api = `https://65a65e8d74cf4207b4efdc2c.mockapi.io/items?page=${curentPage}&limit=8&${
        indexCategories > 0 ? `category=${indexCategories}` : ''
    }&sortBy=${apiCategories}&order=${sortOrder}`;

    // console.log(items);
    // console.log(curentPageCount);
    // console.log(api);

    const onClickCategories = (index) => {
        setIndexCategorites(index);
    };

    const onClickCategoriesSort = (index) => {
        setIndexCategoritesSort(index);
    };

    const onChangePage = (number) => {
        setCurentPage(number);
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
            });
        window.scrollTo(0, 0);
    }, [api, searchValue]);

    const pizzas = items
        .filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map((obj) => <PizzaBlock {...obj} key={obj.id} />);
    const skeletons = [...new Array(12)]?.map((item, index) => <Skeleton key={index} />);

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
            <h2 className='content__title'>{title} пиццы </h2>
            <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
            <Pagination onChangePage={onChangePage} />
        </>
    );
};

export default Home;
