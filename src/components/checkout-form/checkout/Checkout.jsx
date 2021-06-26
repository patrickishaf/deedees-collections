import React from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';

const Checkout = () => {
    const classes = useStyles();
    
    return (
        <>
            <div className={classes.toolbar}/>
        </>
    )
}

export default Checkout
