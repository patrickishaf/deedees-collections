import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState();
    const methods = useForm();

    const countries = Object.entries(shippingCountries.map(([code, name]) => ({id: code, label: name})));
    const subdivisions = Object.entries(shippingSubdivisions.map(([code, name]) => ({id: code, label: name})));
    console.log("YOUR COUNTRIES ARE: ");
    console.log(countries);

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries();
        console.log("THE COUNTRIES FETCHED FROM THE BACKEND ARE: ");
        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        console.log("THE SUBDIVISIONS FETCHED FROM THE BACKEND ARE: ");
        console.log(subdivisions);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        console.log("YOUR SHIPPING COUNTRY'S CODE IS: ");
        console.log(shippingCountry.code);
        if (shippingCountry) fetchSubdivisions(shippingCountry.code);
    }, [shippingCountry]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit="">
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First name" />
                        <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address1" label="Address" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="Zip" label="Postal code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChanged={(e)=>setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/*<Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value="" fullWidth onChanged="">
                                <MenuItem key="" value="">
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value="" fullWidth onChanged="">
                                <MenuItem key="" value="">
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
    */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm;
