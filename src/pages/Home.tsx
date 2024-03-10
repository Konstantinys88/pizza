import React from 'react';
import Pagination from '../components/Pagination';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { title, indexCategories, indexCategoriesSort, searchValue } = useSelector(selectFilter);
    const { status, itemsPizzas } = useSelector(selectPizzas);
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

    const onChangePage = (idx: number) => {
        setCurentPage(idx);
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
            // @ts-ignore
            sortProperty: indexCategoriesSort.sortProperty,
            indexCategories,
            curentPage,
        });
        navigate(`?${queryString}`);
    }, [indexCategoriesSort, indexCategories, curentPage, navigate]);

    const pizzas = itemsPizzas
        .filter((obj: any) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

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
