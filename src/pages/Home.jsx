import React, { useContext } from 'react';
import Pagination from '../components/Pagination';
// import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';
import { AppContext } from '../App';
import { useSelector } from 'react-redux';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const title = useSelector((state) => state.filter.title);
    const indexCategories = useSelector((state) => state.filter.indexCategories);
    const indexCategoriesSort = useSelector((state) => state.filter.indexCategoriesSort);
    const itemsPizzas = useSelector((state) => state.pizzas.itemsPizzas);
    const status = useSelector((state) => state.pizzas.status);

    const { searchValue } = useContext(AppContext);

    // const [isLoading, setIsLoading] = useState(true);
    const [curentPage, setCurentPage] = useState(1);

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

    const onChangePage = (number) => {
        setCurentPage(number);
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(setFilters({ ...params }));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchPizzas({ curentPage, indexCategories, apiCategories, sortOrder }));

        window.scrollTo(0, 0);
    }, [apiCategories, curentPage, dispatch, indexCategories, sortOrder]);

    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: indexCategoriesSort.sortProperty,
            indexCategories,
            curentPage,
        });
        navigate(`?${queryString}`);
    }, [indexCategoriesSort, indexCategories, curentPage, navigate]);

    const pizzas = itemsPizzas
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
                <Categories indexCategories={indexCategories} />
                <Sort />
            </div>
            <h2 className='content__title'>{title} пиццы </h2>{' '}
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>
                        <span>😕</span>
                        <br />
                        Ничего не найдено.
                        <br />
                        <p>Попробуйте зайти позже.</p>
                    </h2>
                </div>
            ) : (
                <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination onChangePage={onChangePage} />
        </>
    );
};

export default Home;
