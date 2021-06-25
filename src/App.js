import React, {useState, useEffect} from 'react'
import {ProductsGrid, Navbar, Cart} from './components';
import {commerce} from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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

    console.log("IN APP.JS, YOUR CART IS: ");
    console.log(cart);

    //console.log("THE PRODUCTS IN THE STORE ARE:");

    //console.log(productsInStore);

    return (
        <Router>
            <div>
                <Navbar totalItemsInCart={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <ProductsGrid products={productsInStore} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App
