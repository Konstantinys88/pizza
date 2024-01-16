
import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';

function App() {

    const [items, setItems] = useState([]);

    const api = 'https://65a65e8d74cf4207b4efdc2c.mockapi.io/items';

    useEffect(() => {
        fetch(api)
            .then((res) => {
                return res.json();
            }).then(json => {
                // console.log(json);
                setItems(json)
            });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">

                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            items.map(obj => <PizzaBlock {...obj} key={obj.id} />)
                        }


                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
