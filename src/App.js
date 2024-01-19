
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import { Routes, Route } from 'react-router';
import Cart from './pages/Cart';
import { createContext, useState } from 'react';

export const AppContext = createContext({});


function App() {

    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            <AppContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='*' element={<NotFound />} />

                        </Routes>
                    </div>
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
