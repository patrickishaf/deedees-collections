import React, { useState, useEffect, useRef } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';


const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries();

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});

        console.log('SHIPPING OPTIONS: ', options);

        setShippingOptions(options);
        setShippingOption(options[0]);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => {})}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <FormInput name="firstName" label="First name" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormInput name="lastName" label="Last name" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormInput name="address1" label="Address" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormInput name="email" label="Email" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormInput name="city" label="City" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormInput name="Zip" label="Postal code" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                { 
                                    Object.entries(shippingCountries).map((country) => (
                                        <MenuItem key={country[0]} value={country[0]}>
                                            {country[1]}
                                        </MenuItem>
                                    ))
                                }
                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                { 
                                    Object.entries(shippingSubdivisions).map((subdivision) => (
                                        <MenuItem key={subdivision[0]} value={subdivision[0]}>{subdivision[1]}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                { 
                                    options.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm;
