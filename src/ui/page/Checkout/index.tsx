import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {CircularProgress} from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import AddressForm from './component/AddressForm.tsx';
import PaymentForm from './component/PaymentForm.tsx';
import Review from './component/Review.tsx';

import {TransactionDto} from "../../../data/dto/TransactionDto.ts";
import * as TransactionApi from "../../../api/TransactionApi.ts"
import {LoginUserContext} from "../../../App.tsx";


type Params = {
    transactionId: string
}

export default function Checkout() {
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate();
    const params = useParams<Params>();

    const [activeStep, setActiveStep] = React.useState(0);
    const [transactionData, setTransactionData] = useState<TransactionDto | undefined>(undefined);
    const [isfinishTransaction, setIsFinishTransaction] = useState<boolean>(false);

    const [addressFormValues, setAddressFormValues] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
    });

    const [paymentFormValues, setPaymentFormValues] = useState({
        cardName: "",
        cardNumber: "",
        expDate: "",
        cvv: ""
    });

    const steps = ['Shipping address', 'Payment details', 'Review your order'];

    function getStepContent(step: number) {
        if (step === 0) {
            return <AddressForm setAddressFormValues={setAddressFormValues}/>;
        } else if (step === 1) {
            return <PaymentForm setPaymentFormValues={setPaymentFormValues}/>;
        } else if (step === 2 && transactionData) {
            return <Review transactionDto={transactionData} addresses={addressFormValues}
                           payments={paymentFormValues}/>;
        } else {
            throw new Error('Unknown step');
        }
    }

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            await handleCheckoutPayment();
            navigate(`/thankYou/${params.transactionId}`);
        } else {
            setActiveStep(activeStep + 1);
        }
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleCheckoutPayment = async () => {
        try {
            if (params.transactionId) {
                setIsFinishTransaction(true);
                await TransactionApi.payTransactionById(params.transactionId);
                await TransactionApi.finishTransactionById(params.transactionId);
                setIsFinishTransaction(false);
            }
        } catch (error) {
            navigate("/error")
        }
    }

    const getTransactionData = async () => {
        try {
            if (params.transactionId) {
                const data = await TransactionApi.getTransactionById(params.transactionId);
                if (data.status === "PREPARE") {
                    setTransactionData(data);
                } else {
                    navigate("/error")
                }
            }
        } catch (error) {
            navigate("/error")
        }
    }

    useEffect(() => {
        if (loginUser) {
            getTransactionData()
        } else if (loginUser === null) {
            navigate("/login")
        }
    }, [loginUser]);

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column',
                    }}
                >
                    <Paper variant="outlined" sx={{p: {xs: 2, md: 3}}}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>

                        <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {activeStep === steps.length ? (
                            <React.Fragment>
                                {/*<Typography variant="h5" gutterBottom>*/}
                                {/*    Thank you for your order.*/}
                                {/*</Typography>*/}
                                {/*<Typography variant="subtitle1">*/}
                                {/*    We have emailed your order confirmation, and will*/}
                                {/*    send you an update when your order has shipped.*/}
                                {/*</Typography>*/}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}

                                {isfinishTransaction ?
                                    (
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                            {activeStep !== 0 && (
                                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                                    Back
                                                </Button>
                                            )}
                                            <Button disabled variant="contained" sx={{mt: 3, ml: 1, width: "137px"}}>
                                                <CircularProgress size={20}/>
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                            {activeStep !== 0 && (
                                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                                    Back
                                                </Button>
                                            )}
                                            <Button variant="contained" onClick={handleNext} sx={{mt: 3, ml: 1}}>
                                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                            </Button>

                                        </Box>
                                    )}
                            </React.Fragment>
                        )}
                    </Paper>
                    {/*<Box sx={{mt: 3}}>*/}
                    {/*    <Copyright/>*/}
                    {/*</Box>*/}
                </Box>
            </Container>
        </React.Fragment>
    );
}

// function Copyright() {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }