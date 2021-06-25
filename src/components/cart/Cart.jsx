import React, { useState, useEffect } from 'react'
import { Grid, Container, Button, Typography } from '@material-ui/core';
import useStyles from './styles';

const Cart = ({ cart }) => {
    const classes = useStyles();

    const EmptyCart = () => {
        return <Typography variant="subtitle1">You have no items in your shopping cart. Start adding items</Typography>
    }
    const PopulatedCart = () => {
        return <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineItem) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                        <div>{lineItem.name}</div>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    };

    if (!cart.line_items) return "Loading...";

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
            { (cart.line_items.length === 0) ? <EmptyCart/> : <PopulatedCart/> }
        </Container>
    );
}

export default Cart;
