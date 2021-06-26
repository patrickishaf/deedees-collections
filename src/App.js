import React, { useState, useEffect } from 'react'
import { ProductsGrid, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
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

    const addToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const updateProductQuantity = async (productId, quantity) => {
        const { cart }  = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    const removeProductFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const emptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItemsInCart={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <ProductsGrid products={productsInStore} onAddToCart={addToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateProductQuantity={updateProductQuantity}
                            handleRemoveProductFromCart={removeProductFromCart}
                            handleEmptyCart={emptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App
