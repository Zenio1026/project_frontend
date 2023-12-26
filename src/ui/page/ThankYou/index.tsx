import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import {LoginUserContext} from "../../../App.tsx";
import * as TransactionApi from "../../../api/TransactionApi.ts"
import {TransactionDto} from "../../../data/dto/TransactionDto.ts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";

type Params = {
    transactionId: string;
}

export default function ThankYou() {
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate();
    const params = useParams<Params>();

    const [transactionData, setTransactionData] = useState<TransactionDto | undefined>(undefined);

    const datetime = transactionData && transactionData.datetime;
    const formattedDatetime = datetime ? `${datetime.substr(6, 2)}/${datetime.substr(4, 2)}/${datetime.substr(0, 4)}` : null;

    const email = loginUser?.email;
    const atIndex = email?.indexOf('@');
    const maskedEmail = email?.substring(0, atIndex);

    const finishedTransactionData = async () => {
        try {
            if (params.transactionId) {
                const data = await TransactionApi.getTransactionById(params.transactionId);
                setTransactionData(data);
            }
        } catch (error) {
            navigate("/error")
        }
    }

    const handleGoBack = () => {
        navigate("/"); // Navigating back to the previous page
    };

    useEffect(() => {
        if (loginUser) {
            finishedTransactionData()
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
                    <Box sx={{overflow: 'auto', maxHeight: '80vh'}}>
                        <Paper variant="outlined" sx={{p: {xs: 2, md: 3}, width: '79vh'}}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div style={{textAlign: 'center'}}>
                                    <img src="/public/logo.avif" alt="Logo"
                                         style={{width: '200px', height: '200px'}}/>
                                    <Typography style={{fontSize: '40px'}}>
                                        Order Confirmation
                                    </Typography>
                                </div>
                            </div>

                            <p style={{paddingLeft: '24px', paddingRight: '24px'}}>Dear {maskedEmail},</p>
                            <p style={{paddingLeft: '24px', paddingRight: '24px'}}>Thank you for your purchase.</p>
                            <p style={{paddingLeft: '24px', paddingRight: '24px'}}>
                                A receipt of your order is below. Be sure to keep it in a safe place for future
                                reference.
                            </p>

                            <TableContainer sx={{paddingTop: '16px'}}>
                                <Table>
                                    <TableBody>
                                        <TableRow key="order-number">
                                            <TableCell
                                                sx={{border: '1px solid black', paddingLeft: '36px', width: '50%'}}>
                                                Order Number: {transactionData?.tid}
                                            </TableCell>
                                            <TableCell sx={{
                                                border: '1px solid black',
                                                paddingRight: '36px',
                                                width: '50%',
                                                textAlign: 'right'
                                            }}>
                                                {formattedDatetime}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TableContainer sx={{paddingTop: '32px'}}>
                                <Table>
                                    <TableHead sx={{backgroundColor: 'black'}}>
                                        <TableRow key="order-detail">
                                            <TableCell sx={{
                                                color: 'white',
                                                fontSize: '19px',
                                                fontWeight: 'bold',
                                                width: '26%'
                                            }}>Details</TableCell>
                                            <TableCell
                                                sx={{
                                                    color: 'white',
                                                    fontSize: '19px',
                                                    fontWeight: 'bold',
                                                    textAlign: 'left'
                                                }}></TableCell>
                                            <TableCell sx={{
                                                color: 'white',
                                                fontSize: '19px',
                                                fontWeight: 'bold',
                                                textAlign: 'right',
                                                width: '20%'
                                            }}>Qty.</TableCell>
                                            <TableCell sx={{
                                                color: 'white',
                                                fontSize: '19px',
                                                fontWeight: 'bold',
                                                textAlign: 'right',
                                                width: '20%'
                                            }}>Price</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {transactionData?.items &&
                                            transactionData.items.map((item) => {
                                                return (
                                                    <TableRow key={item.product.pid}>
                                                        <TableCell>
                                                            <Avatar src={`${item.product.image_url}`} style={{
                                                                width: '150px',
                                                                height: '150px',
                                                                borderRadius: '8px'
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>{item.product.name}</TableCell>
                                                        <TableCell sx={{textAlign: 'right', width: '20%'}}>
                                                            {item.quantity}
                                                        </TableCell>
                                                        <TableCell sx={{textAlign: 'right', width: '20%'}}>
                                                            ${item.subtotal.toLocaleString('en-US', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Typography sx={{fontSize: '1.8em', textAlign: 'right', paddingTop: '24px'}}>
                                Total: ${transactionData?.total.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                            </Typography><br/>

                            {/*<p>*/}
                            {/*    To review and save your order details: &nbsp;*/}
                            {/*    <a href={`http://localhost:5173/thankYou/${transactionData?.tid}`}>*/}
                            {/*        Click Here*/}
                            {/*    </a>*/}
                            {/*</p>*/}

                            <p>Thank you,</p>

                            <p>GameStation</p>

                        </Paper>
                    </Box>

                    <div style={{marginTop: '20px'}}>
                        <IconButton
                            size="small"
                            disableRipple
                            style={{
                                color: 'snow',
                                fontFamily: 'Arial',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                fontSize: '20px',
                            }}
                            onClick={handleGoBack}
                        >
                            <ArrowBackIosNewIcon style={{fontSize: '20px', padding: '0 10px'}}/>
                            Back to Home Page
                        </IconButton>
                    </div>

                </Box>
            </Container>
        </React.Fragment>
    )
}