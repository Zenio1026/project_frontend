import {ThemeProvider} from "@emotion/react";
import {CssBaseline, Grid, Paper} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";

type Params = {
    productId: string
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ProductDetail() {
    const {productId} = useParams<Params>();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.6)),
                                          url(https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/yIa8STLMmCyhj48fGDpaAuRM.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography gutterBottom variant="h3" component="h2" noWrap>
                            GAME NAME
                        </Typography>
                        <Typography variant="h6">$XXX.XX</Typography>


                        <Button
                            type="submit"
                            variant="contained"

                            sx={{
                                mt: 3,
                                mb: 2,
                                textTransform: 'none',
                                borderRadius: '24px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                backgroundColor: 'rgb(214,61,0)',
                                width: '300px'

                        }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )

}