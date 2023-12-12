import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ProductListDto} from "../../../../data/dto/ProductDto.ts";

type Props = {
    productList: ProductListDto[];
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ProductCard({productList}: Props) {

    return (
        <ThemeProvider theme={defaultTheme}>
            <main>
                <Container sx={{py: 5}} maxWidth="xl">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                        {productList.map((item) => (
                            <Grid item key={item.pid} xs={12} sm={6} md={3}>
                                <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '100%',
                                        }}
                                        image={item.image_url}
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2" noWrap>
                                            {item.name}
                                        </Typography>
                                        <Typography>
                                            HKD ${item.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{padding: "0px 12px 16px"}}>
                                        <Button variant="contained"
                                                size="small"
                                                sx={{textTransform: 'none', borderRadius: '16px', fontSize: '11px',
                                                    '&:hover': {
                                                        boxShadow: 'inset 0 0 0 2px white, 0 0 0 2px rgb(25,118,210)'
                                                    }
                                                }}>Find out more</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </main>

            {/* Footer */}
            {/*<Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">*/}
            {/*    <Typography variant="h6" align="center" gutterBottom>*/}
            {/*        Footer*/}
            {/*    </Typography>*/}
            {/*    <Typography*/}
            {/*        variant="subtitle1"*/}
            {/*        align="center"*/}
            {/*        color="text.secondary"*/}
            {/*        component="p"*/}
            {/*    >*/}
            {/*        Something here to give the footer a purpose!*/}
            {/*    </Typography>*/}
            {/*    <Copyright/>*/}
            {/*</Box>*/}
            {/* End footer */}

        </ThemeProvider>
    );
}