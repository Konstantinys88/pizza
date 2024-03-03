import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
    return (
        <div className='cart cart--empty'>
            <h2>
                Корзина пустая <span>😕</span>
            </h2>
            <p>
                Вероятней всего, вы еще не выбрали вашу пиццу.
                <br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={cartEmptyImg} alt='Empty cart' />
            <Link to='/' className='button button--black'>
                <span>Выбрать пиццу</span>
            </Link>
        </div>
    );
};

export default CartEmpty;
