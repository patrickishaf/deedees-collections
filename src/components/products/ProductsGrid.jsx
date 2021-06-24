import React from 'react';
import {Grid} from '@material-ui/core';
import ProductCard from './product/ProductCard';

const products = [
    {
        id: 1,
        name: "Shoes",
        description: "Running shoes",
        price: "$5",
        imageUrl: "https://picsum.photos/id/1060/536/354?blur=2",
    },
    {
        id: 2,
        name: "Macbook",
        description: "Apple Macbook",
        price: "$10",
        imageUrl: "https://i.picsum.photos/id/782/400/300.jpg?hmac=TJmc5WtbOmIsJlFZZRLmo3bBsrZfmFL2xu6uRLkcYxk",
    },
];

const ProductsGrid = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => {
                    return (
                        <Grid item key={product.id} xs={12} sm={4} md={4} lg={3}>
                            <ProductCard product={product}/>
                        </Grid>
                    );
                })}
            </Grid>
        </main>
    );
}

export default ProductsGrid;