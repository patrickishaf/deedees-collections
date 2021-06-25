import React, {useState, useEffect} from 'react'
import {ProductsGrid, Navbar} from './components';
import {commerce} from './lib/commerce';

const App = () => {
    const [productsInStore, setProductsInStore] = useState([]);
    const [cart, setCart] = useState({});
    
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProductsInStore(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    console.log("THE PRODUCTS IN THE STORE ARE:");

    console.log(productsInStore);

    return (
        <div>
            <Navbar />
            <ProductsGrid products={productsInStore} onAddToCart={handleAddToCart}/>
        </div>
    )
}

export default App
