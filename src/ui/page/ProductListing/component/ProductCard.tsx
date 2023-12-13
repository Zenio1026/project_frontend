import {useState} from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ProductListDto } from '../../../../data/dto/ProductDto.ts';

type Props = {
    productList: ProductListDto[];
};

const defaultTheme = createTheme();

export default function ProductCard({ productList }: Props) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const handleCardHover = (index: number) => {
        setHoveredCard(index);
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <main>
                <Container sx={{ py: 5 }} maxWidth="xl">
                    <Grid container spacing={4}>
                        {productList.map((item, index) => (
                            <Grid
                                item
                                key={item.pid}
                                xs={12}
                                sm={6}
                                md={3}
                                onMouseEnter={() => handleCardHover(index)}
                                onMouseLeave={handleCardLeave}
                                style={{
                                    transform: hoveredCard === index ? 'scale(1.06)' : 'scale(1)',
                                    transition: 'transform 0.3s ease',
                                    filter: hoveredCard !== null && hoveredCard !== index ? 'brightness(0.6)' : 'none'
                                }}
                            >
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            pt: '100%',
                                        }}
                                        image={item.image_url}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2" noWrap>
                                            {item.name}
                                        </Typography>
                                        <Typography>HKD ${item.price}</Typography>
                                    </CardContent>
                                    <CardActions sx={{ padding: '0px 12px 16px' }}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: '16px',
                                                fontSize: '11px',
                                                '&:hover': {
                                                    boxShadow: 'inset 0 0 0 2px white, 0 0 0 2px rgb(25,118,210)',
                                                },
                                            }}
                                        >
                                            Find out more
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}