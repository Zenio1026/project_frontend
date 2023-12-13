import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    quantity: number,
    handlePlus: () => void,
    handleMinus: () => void
}

export default function QuantitySelector({quantity, handleMinus, handlePlus}: Props) {
    return (
        <div>
            <ButtonGroup >

                <Button style={{
                    width: '40px',
                    height: '40px',
                    border: '0px solid rgb(27,74,120)',
                    borderRadius: '24px',
                    }}
                        onClick={handleMinus}>
                    <RemoveIcon fontSize="small" style={{color: `rgb(214,61,0)`}}/>
                </Button>

                <Button style={{
                    width: '220px',
                    height: '40px',
                    color: 'rgba(255,255,255,0.7)',
                    border: 0,
                    fontSize: "20px",
                    textTransform: "none",
                    }}
                        disableRipple={true}
                        disabled
                        >
                    Quantity: {quantity}
                </Button>

                <Button style={{
                    width: '40px',
                    height: '40px',
                    border: '0px solid rgb(27,74,120)',
                    borderRadius: '24px'}}
                        onClick={handlePlus}>
                    <AddIcon fontSize="small" style={{color: `rgb(214,61,0)`}}/>
                </Button>

            </ButtonGroup>
        </div>
    );
}