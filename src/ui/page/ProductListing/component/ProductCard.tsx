import {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ProductListDto} from '../../../../data/dto/ProductDto.ts';
import {Link, useNavigate} from "react-router-dom";
import {Button, CardActions} from "@mui/material";

type Props = {
    productList: ProductListDto[];
};

export default function ProductCard({productList}: Props) {
    const navigate = useNavigate();

    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const handleCardHover = (index: number) => {
        setHoveredCard(index);
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    return (
        <main>
            <Container sx={{py: 5}} maxWidth="xl">
                <Grid container spacing={4}>

                    {productList.map((item, index) => (
                        <Grid
                            key={item.pid}
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            onMouseEnter={() => handleCardHover(index)}
                            onMouseLeave={handleCardLeave}
                            style={{
                                transform: hoveredCard === index ? 'scale(1.06)' : 'scale(1)',
                                transition: 'transform 0.3s ease',
                                filter: hoveredCard !== null && hoveredCard !== index ? 'brightness(0.6)' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onClick={() => {
                                navigate(`/product/${item.pid}`)
                            }}
                        >
                            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                                <CardMedia component="div" sx={{pt: '100%',}} image={item.image_url}/>
                                <CardContent sx={{padding: "20px"}}>
                                    <Typography variant="h6" component="h2" noWrap>
                                        {item.name}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{padding: '0px 12px 16px', marginLeft: 'auto'}}>
                                    <Link to={`/product/${item.pid}`}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: '16px',
                                                fontSize: '11px',
                                                '&:hover': {boxShadow: 'inset 0 0 0 2px white, 0 0 0 2px rgb(25,118,210)'}
                                            }}
                                        >
                                            Find out more
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </main>
    );
}