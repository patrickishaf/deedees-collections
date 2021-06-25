import React from 'react';
import {Grid} from '@material-ui/core';
import ProductCard from './product/ProductCard';
import useStyles from './styles';

const ProductsGrid = ({products, onAddToCart }) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => {
                    return (
                        <Grid item key={product.id} xs={12} sm={4} md={4} lg={3}>
                            <ProductCard product={product} onAddToCart={onAddToCart}/>
                        </Grid>
                    );
                })}
            </Grid>
        </main>
    );
}

export default ProductsGrid;