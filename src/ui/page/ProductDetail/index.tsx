import {Grid, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router-dom";
import QuantitySelector from "../../component/QuantitySelector.tsx";
import {useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/dto/ProductDto.ts";
import Loading from "../../component/Loading.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import TopNavBar from "../../component/TopNavBar.tsx";
import Hidden from "@mui/material/Hidden";


type Params = {
    productId: string
}

export default function ProductDetail() {
    const {productId} = useParams<Params>();

    const navigate = useNavigate()

    const [quantity, setQuantity] = useState<number>(1);
    const [productDetail, setProductDetail] = useState<ProductDetailDto | undefined>(undefined);

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

    const getProductDetail = async (productId: string) => {
        try {
            const response = await ProductApi.getProductDetail(productId);
            setProductDetail(response);
            document.title = response.name
        } catch (e) {
            navigate("/error");
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
        <>
            <Box sx={{height: "100vh", overflow: "hidden"}}>

                <TopNavBar/>

                {productDetail ? (
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
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    color: "white",
                                    height: "75%",
                                }}
                            >
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
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            textTransform: "none",
                                            borderRadius: "24px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            backgroundColor: "rgb(214,61,0)",
                                            width: "300px",
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                ) : (
                    <Loading/>
                )}
            </Box>
        </>
    );
}