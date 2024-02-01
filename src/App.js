
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import { Routes, Route } from 'react-router';
import Cart from './pages/Cart';



function App() {


    return (
        <div className="wrapper">

            <Header />
            <div className="content">
                <div className="container">
                    <Routes>

                        <Route path='/' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='*' element={<NotFound />} />

                        <Route path='/pizza/:id' element={<FullPizza />} />

                    </Routes>
                </div>
            </div>

        </div>
    );
}

export default App;
