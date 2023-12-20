import {CircularProgress, Grid, Paper, Snackbar, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import MuiAlert, {AlertProps} from '@mui/material/Alert';

import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {LoginUserContext} from "../../../App.tsx";
import Loading from "../../component/Loading.tsx";
import QuantitySelector from "./component/QuantitySelector.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";

import {ProductDetailDto} from "../../../data/dto/ProductDto.ts";
import * as ProductApi from "../../../api/ProductApi.ts"
import * as CartItemApi from "../../../api/CartItemApi.ts"


type Params = {
    productId: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductDetail() {
    const {productId} = useParams<Params>();
    const navigate = useNavigate()
    const loginUser = useContext(LoginUserContext);
    const [quantity, setQuantity] = useState<number>(1);
    const [productDetail, setProductDetail] = useState<ProductDetailDto | undefined>(undefined);
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity((quantity) => quantity - 1);
        }
    }

    const handlePlus = () => {
        if (productDetail && quantity < productDetail.stock) {
            setQuantity((quantity) => quantity + 1);
        }
    }

    const handleButtonClick = () => {
        handleClick();
        handleAddToCart();
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const renderSelectorAndButton = (productDetail: ProductDetailDto) => {
        if (productDetail?.stock > 0) {
            return (
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <QuantitySelector
                        quantity={quantity}
                        handleMinus={handleMinus}
                        handlePlus={handlePlus}
                    />

                    {renderAddToCartButton()}

                </Grid>
            );
        } else {
            return (
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        disableRipple
                        type="submit"
                        variant="contained"
                        style={{
                            width: "300px",
                            textTransform: "none",
                            borderRadius: "24px",
                            color: "rgb(44,45,51)",
                            fontSize: "16px",
                            fontWeight: "bold",
                            backgroundColor: "rgb(95,95,95)",
                            cursor: 'not-allowed',
                            boxShadow: 'none'
                        }}
                    >
                        Out Of Stock
                    </Button>
                </Grid>
            );
        }
    }

    const renderAddToCartButton = () => {
        if (isAddingCart) {
            return (
                <Button
                    disabled
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        width: "300px",
                        textTransform: "none",
                        borderRadius: "24px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        backgroundColor: "rgb(112, 32, 0)",
                    }}
                >
                    <CircularProgress style={{color: 'rgb(112, 32, 0)'}} size={28}/>
                </Button>
            )
        } else {
            return (
                <Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        disableRipple
                        sx={{
                            mt: 3,
                            mb: 2,
                            width: "300px",
                            textTransform: "none",
                            borderRadius: "24px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            backgroundColor: "rgb(214,61,0)",
                            "&:hover": {
                                backgroundColor: "rgb(163, 46, 0)",
                            },
                            "&:active": {
                                backgroundColor: "rgb(112, 32, 0)",
                            },
                        }}
                        onClick={handleButtonClick}
                    >
                        Add to Cart
                    </Button>

                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {productDetail && `Added ${quantity} ${productDetail.name} to the shopping cart.`}
                        </Alert>
                    </Snackbar>
                </Stack>
            )
        }
    }

    const getProductDetail = async (productId: string) => {
        try {
            const response = await ProductApi.getProductDetail(productId);
            setProductDetail(response);
            document.title = response.name
        } catch (e) {
            navigate("/error");
        }
    }

    const handleAddToCart = async () => {
        if (loginUser) {
            if (productId) {
                setIsAddingCart(true);
                await CartItemApi.putCartItem(productId, quantity);
                setIsAddingCart(false);
            }
        } else if (loginUser === null) {
            navigate("/login")
        }
    }

    useEffect(() => {
        if (productId) {
            getProductDetail(productId);
        } else {
            navigate("/error");
        }
    }, [])

    return (
        <Box sx={{height: "100vh", overflow: "hidden"}}>
            <TopNavBar/>
            {
                productDetail ? (
                    <Grid container component="main" sx={{height: '100vh'}}>
                        <Hidden xsDown>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), rgba(19,19,19,0.5), rgba(38,38,38,1)), url(${productDetail.image_url})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    // backgroundColor: (t) =>
                                    //     t.palette.mode === "light"
                                    //         ? t.palette.grey[50]
                                    //         : t.palette.grey[900],
                                    // transition: "background-color 0.5s"
                                }}
                            />
                        </Hidden>

                        <Hidden smUp>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(19,19,19,0.5), rgba(38,38,38,1)), url(${productDetail.image_url})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    // backgroundColor: (t) =>
                                    //     t.palette.mode === "light"
                                    //         ? t.palette.grey[50]
                                    //         : t.palette.grey[900],
                                    // transition: "background-color 0.5s"
                                }}
                            />
                        </Hidden>

                        <Grid
                            item
                            xs={12}
                            sm={8}
                            md={5}
                            component={Paper}
                            elevation={6}
                            square
                            sx={{
                                backgroundImage: "linear-gradient(to right, rgb(30,30,30), rgba(25,25,25))",
                                padding: '48px',
                                // transition: "background-color 0.5s",
                            }}
                        >
                            <Box sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                color: "white",
                                height: "75%",
                            }}>
                                <Typography
                                    gutterBottom
                                    variant="h3"
                                    sx={{marginBottom: "4px"}}
                                >
                                    {productDetail.name}
                                </Typography>

                                <Typography
                                    sx={{
                                        marginBottom: "128px",
                                        marginLeft: "2px",
                                        color: "rgba(255, 255, 255, 0.5)"
                                    }}
                                >
                                    {productDetail.description}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        my: 2,
                                        textAlign: "right",
                                        marginRight: "12px",
                                    }}
                                >
                                    HK${productDetail.price.toFixed(2)}
                                </Typography>

                                {/*<Typography*/}
                                {/*    sx={{*/}
                                {/*        my: 2,*/}
                                {/*        textAlign: "right",*/}
                                {/*        marginRight: "12px",*/}
                                {/*    }}>*/}
                                {/*    Stock: {productDetail.stock}*/}
                                {/*</Typography>*/}

                                {renderSelectorAndButton(productDetail)}

                            </Box>
                        </Grid>
                    </Grid>
                ) : (
                    <Loading/>
                )
            }
        </Box>
    );
}