import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigating back to the previous page
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40vh',
            }}
        >
            <h1
                style={{
                    color: 'snow',
                    fontFamily: 'Arial',
                    fontSize: '30px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
            >
                Start shopping to fill your cart !
            </h1>

            <div style={{ marginTop: '16px' }}>
                    <IconButton
                        size="small"
                        disableRipple
                        style={{
                            color: 'snow',
                            fontFamily: 'Arial',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            fontSize: '20px',
                        }}
                        onClick={handleGoBack}
                    >
                        <ArrowBackIosNewIcon style={{fontSize: '20px', padding: '0 10px'}}/>
                             Continue Shopping
                    </IconButton>
            </div>

        </div>
    );
}