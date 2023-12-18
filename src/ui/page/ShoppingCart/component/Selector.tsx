import {alpha, Button, ButtonGroup, createTheme, ThemeProvider} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    quantity: number;
    handleOnChange: (updatedQuantity: number) => void;
}

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: alpha('#808080', 0.1)
                    },
                    '& .MuiTouchRipple-child': {
                        backgroundColor: 'gray',
                    },
                },
            },
        },
    },
});

export default function Selector({quantity, handleOnChange}: Props) {
    return (
        <>
            <ButtonGroup
                style={{
                    border: '1px solid rgb(224,224,224)',
                    padding: '4px',
                    borderRadius: '24px',
                }}
            >
                <ThemeProvider theme={theme}>
                    <Button
                        style={{
                            width: '36px',
                            height: '36px',
                            border: '0px solid',
                            borderRadius: '24px',
                        }}
                        centerRipple={true}
                        onClick={() => handleOnChange(quantity - 1)}
                    >
                        <RemoveIcon fontSize="small" style={{color: `rgb(152, 152, 152)`}}/>
                    </Button>

                    <Button
                        style={{
                            width: '36px',
                            height: '36px',
                            border: '0px solid',
                            color: 'black',
                        }}
                        disableRipple={true}
                        disabled
                    >
                        {quantity}
                    </Button>


                    <Button
                        style={{
                            width: '36px',
                            height: '36px',
                            border: '0px solid',
                            borderRadius: '24px',
                        }}
                        centerRipple={true}
                        onClick={() => handleOnChange(quantity + 1)}
                    >
                        <AddIcon fontSize="small" style={{color: `rgb(152, 152, 152)`}}/>
                    </Button>
                </ThemeProvider>
            </ButtonGroup>
        </>
    )
}