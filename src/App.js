import React, { useState, useEffect } from 'react'
import { ProductsGrid, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [productsInStore, setProductsInStore] = useState([]);
    const [cart, setCart] = useState({});
    
    const fetchProducts = async () => {
        try {
            const { data } = await commerce.products.list();
            setProductsInStore(data);
        } catch (error) {
            console.log("FETCHING PRODUCTS ENDED WITH AN ERROR: ");
            console.log(error.message);
            console.log("THE PRODUCTS IN THE STORE ARE: ")
            console.log(productsInStore);
        }
    };

    const fetchCart = async () => {
        try {
            setCart(await commerce.cart.retrieve());
        } catch (error) {
            console.log("SETTING THE CART ENDED WITH AN ERROR: ")
            console.log(error.message);
            console.log("YOUR CART IS CURRENTLY: ");
            console.log(cart);
        }
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
                        <Checkout cart={cart} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App
