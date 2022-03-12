import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState({});
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        // In useEffect, you can not supply an async callback. If you want to use an async function,
        // you'll have to define it first. That's why I defined this function outside useState.
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                console.log("YOUR TOKEN HAS BEEN GENERATED. IT IS:", token);
                setCheckoutToken(token);
            } catch (error) {
                console.log("GENERATING TOKEN ENDED WITH AN ERROR: ", error);
            }
        };
        generateToken();
    }, [cart]);

    const moveToNextStep = () => setActiveStep((currentActiveStep) => currentActiveStep + 1);
    const moveToPreviousStep = () => setActiveStep((currentActiveStep) => currentActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        moveToNextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken}/>
        : <PaymentForm/>
    
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
