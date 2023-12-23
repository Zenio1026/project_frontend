import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {TransactionDto} from "../../../../data/dto/TransactionDto.ts";
import {ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";

type Props = {
    transactionDto: TransactionDto;
    addresses: {
        firstName: string,
        lastName: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        zipCode: string,
        country: string
    };
    payments: {
        cardName: string,
        cardNumber: string,
        expDate: string,
        cvv: string
    };
}

export default function Review({transactionDto, addresses, payments}: Props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>

            <List disablePadding>
                {transactionDto.items.map((item) => (
                    <ListItem key={item.tpid} sx={{py: 1, px: 0}}>
                        <ListItemAvatar>
                            <Avatar
                                src={item.product.image_url}
                                alt={item.product.name}
                                // sx={{width: 60, height: 60}}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.product.name}
                            secondary={`$ ${item.product.price.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} \u00A0 | \u00A0\u00A0  Qty: ${item.quantity}`}
                        />
                        <Typography variant="body2">
                            $ {item.subtotal.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                        </Typography>
                    </ListItem>
                ))}

                <ListItem sx={{py: 1, px: 0, pt: 2}}>
                    <ListItemText primary={
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Total
                        </Typography>
                    }
                    />
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        $ {transactionDto.total.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                    </Typography>
                </ListItem>

            </List>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{`${addresses.firstName}, ${addresses.lastName}`}</Typography>
                    <Typography gutterBottom>
                        {`${addresses.address1}, ${addresses.address2}, ${addresses.city}, ${addresses.state}, ${addresses.zipCode}, ${addresses.country}`}
                    </Typography>
                </Grid>

                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Payment details
                    </Typography>
                    <Grid container>

                            <React.Fragment key={payments.cardName}>
                                <Grid item >
                                    <Typography gutterBottom>Card holder &nbsp;&nbsp;&nbsp; {payments.cardName}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom>
                                        Card number &nbsp; **** **** **** {payments.cardNumber.slice(-4)}
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Typography gutterBottom>Expiry date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{payments.expDate}</Typography>
                                </Grid>
                            </React.Fragment>

                    </Grid>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}