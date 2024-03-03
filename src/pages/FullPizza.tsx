import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

const FullPizza: React.FC = () => {
    const dispatch = useDispatch();

    const [pizza, setPizza] = useState<{
        id: number,
        title: string,
        price: number,
        imageUrl: string,
        sizes: number[],
        types: number[],
    }>();

    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const { id } = useParams();

    const cartItem = useSelector((state: any) => state.cart.items.find((obj: any) => obj.id === id));

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://65a65e8d74cf4207b4efdc2c.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPizza();
    }, [id]);

    const onClickActiveType = (index: any) => {
        setActiveType(index);
    };

    const onClickActiveSize = (index: any) => {
        setActiveSize(index);
    };

    const typeNames = ['Тонкое', 'Традиционное'];

    if (!pizza) {
        return <>"Загрузка..."</>
    }

    const onClickAdd = () => {
        const item = {
            id: pizza.id,
            title: pizza.title,
            price: pizza.price,
            imageUrl: pizza.imageUrl,
            type: typeNames[activeType],
            size: activeSize,
        };
        dispatch(addItem(item));
    };

    const addedCount = cartItem ? cartItem.count : 0;

    return (
        <div className='fullPizza'>
            <h4 className='pizza-block__title pizza-block__title_fullpage'>{pizza.title}</h4>
            <img
                className='pizza-block__image pizza-block__image_fullpage'
                src={pizza.imageUrl}
                alt='Pizza'
            />
            <div className='pizza-block__selector'>
                <ul>
                    {pizza.types.map((type: any, index: any) => {
                        return (
                            <li
                                key={index}
                                onClick={() => onClickActiveType(index)}
                                className={activeType === index ? 'active' : ''}
                            >
                                {typeNames[type]}
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    {pizza.sizes.map((size: any, index: any) => {
                        return (
                            <li
                                key={index}
                                onClick={() => onClickActiveSize(index)}
                                className={activeSize === index ? 'active' : ''}
                            >
                                {size} см.
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='pizza-block__bottom pizza-block__bottom_fullpage'>
                <div className='pizza-block__price'>от {pizza.price} ₽</div>
                <button onClick={onClickAdd} className='button button--outline button--add'>
                    <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                            fill='white'
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount ? <i>{addedCount}</i> : null}
                </button>
            </div>
        </div>
    );
};

export default FullPizza;
