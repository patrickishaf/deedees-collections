import React, {useState, useEffect} from 'react'
import {ProductsGrid, Navbar} from './components';
import {commerce} from './lib/commerce';

const App = () => {
    const [productsInStore, setProductsInStore] = useState([]);
    
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProductsInStore(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(productsInStore);

    return (
        <div>
            <Navbar />
            <ProductsGrid products={productsInStore}/>
        </div>
    )
}

export default App
