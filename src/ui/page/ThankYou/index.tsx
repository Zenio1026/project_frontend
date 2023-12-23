import React, {useContext, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

import mockdata from "./response.json"
import {TransactionDto} from "../../../data/dto/TransactionDto.ts";
import Avatar from "@mui/material/Avatar";
import {LoginUserContext} from "../../../App.tsx";
import {useNavigate} from "react-router-dom";

export default function ThankYou() {
    const loginUser = useContext(LoginUserContext);

    const navigate = useNavigate();

    const [transactionData, setTransactionData] = useState<TransactionDto | undefined>(undefined);

    const datetime = transactionData && transactionData.datetime;
    const formattedDatetime = datetime ? `${datetime.substr(6, 2)}/${datetime.substr(4, 2)}/${datetime.substr(0, 4)}` : null;

    const finishedTransactionData = async () => {
        setTransactionData(mockdata);
    }

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
                                    <h1>LOGO!</h1>
                                    <Typography style={{fontSize: '40px'}}>
                                        Order Confirmation
                                    </Typography>
                                </div>
                            </div>

                            <p style={{paddingLeft: '24px', paddingRight: '24px'}}>Dear XXXXX</p>
                            <p style={{paddingLeft: '24px', paddingRight: '24px'}}>Thank you for your purchase.</p>
                            <p style={{paddingLeft: '24px', paddingRight: '24px'}}>
                                A receipt of your order is below. Be sure to keep it in a safe place for future
                                reference.
                            </p>

                            <br/> <br/>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow key="order-number">
                                            <TableCell
                                                sx={{border: '1px solid black', paddingLeft: '36px', width: '50%'}}>
                                                Order Number: 12345-67890
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
                            <br/> <br/>

                            <TableContainer>
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
                                Estimated Total: ${transactionData?.total.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                            </Typography><br/>

                            <p>To review your order details: xxxxxxxxxxx/xxxxx</p><br/>

                            <p>Thank you,</p>

                            <p>GameStation</p>

                        </Paper>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
}