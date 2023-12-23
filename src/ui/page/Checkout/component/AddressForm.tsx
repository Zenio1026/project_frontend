import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useState} from "react";

type Props = {
    setAddressFormValues: React.Dispatch<React.SetStateAction<{
        firstName: string,
        lastName: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        zipCode: string,
        country: string
        }>>;
}

export default function AddressForm({setAddressFormValues}: Props) {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address1, setAddress1] = useState<string>("");
    const [address2, setAddress2] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, firstName: event.target.value }));
    }
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, lastName: event.target.value }));
    }
    const handleAddress1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress1(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, address1: event.target.value }));
    }
    const handleAddress2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress2(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, address2: event.target.value }));
    }
    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, city: event.target.value }));
    }
    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, state: event.target.value }));
    }
    const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, zipCode: event.target.value }));
    }
    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
        setAddressFormValues((prevValues) => ({ ...prevValues, country: event.target.value }));
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={address1}
                        onChange={handleAddress1Change}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        value={address2}
                        onChange={handleAddress2Change}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={city}
                        onChange={handleCityChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        value={state}
                        onChange={handleStateChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        value={zipCode}
                        onChange={handleZipCodeChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={country}
                        onChange={handleCountryChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}