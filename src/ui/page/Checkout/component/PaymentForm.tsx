import * as React from 'react';
import {useState} from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type Props = {
    setPaymentFormValues: React.Dispatch<React.SetStateAction<{
        cardName: string;
        cardNumber: string;
        expDate: string;
        cvv: string;
    }>>;
}

export default function PaymentForm({setPaymentFormValues}: Props) {
    const [cardName, setCardName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expDate, setExpDate] = useState<string>("");
    const [cvv, setCvv] = useState<string>("");

    const handleCardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardName(event.target.value);
        setPaymentFormValues(prevState => ({...prevState, cardName: event.target.value}));
    }
    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Check if the input is empty or consists of only dashes
        if (value === "" || /^-+$/.test(value)) {
            setCardNumber("");
            return;
        }

        // Remove any non-digit characters from the input
        const sanitizedValue = value.replace(/\D/g, "");

        // Format the value with dashes after every 4 digits
        let formattedValue = sanitizedValue.replace(/(\d{4})/g, "$1-");

        // Remove a dash if the user deletes the preceding digit
        if (value.length < cardNumber.length && value.endsWith("-")) {
            formattedValue = formattedValue.slice(0, formattedValue.length - 1);
        }

        if (formattedValue.endsWith("-")) {
            formattedValue = formattedValue.slice(0, formattedValue.length - 1);
        }

        // Remove any extra dashes at the end
        const truncatedValue = formattedValue.slice(0, 19);
        setCardNumber(truncatedValue);
        setPaymentFormValues(prevState => ({...prevState, cardNumber: event.target.value}));
    };
    const handleExpDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Remove any non-digit characters from the input
        const sanitizedValue = value.replace(/\D/g, "");

        // Limit the input to 4 digits (MMYY)
        const truncatedValue = sanitizedValue.slice(0, 4);

        // Format the value with a slash after the first 2 digits
        let formattedValue = truncatedValue.replace(/^(\d{2})/, "$1/");

        if (formattedValue.endsWith("/")) {
            formattedValue = formattedValue.slice(0, formattedValue.length - 1);
        }

        setExpDate(formattedValue);
        setPaymentFormValues(prevState => ({...prevState, expDate: event.target.value}));
    };
    const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Remove any non-digit characters from the input
        const sanitizedValue = value.replace(/\D/g, "");

        // Limit the input to 3 digits
        const truncatedValue = sanitizedValue.slice(0, 3);
        setCvv(truncatedValue);
        setPaymentFormValues(prevState => ({...prevState, cvv: event.target.value}));
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        value={cardName}
                        onChange={handleCardNameChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        helperText="MM/YY"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        value={expDate}
                        onChange={handleExpDate}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        value={cvv}
                        onChange={handleCvvChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}