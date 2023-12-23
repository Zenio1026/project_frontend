import {Button, ButtonGroup, CircularProgress, circularProgressClasses, CircularProgressProps} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

function FacebookCircularProgress(props: CircularProgressProps) {
    return (
        <Box sx={{position: 'relative'}}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#0070D1' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

export default function SelectorSkeleton() {
    return (
        <>
            <ButtonGroup
                style={{
                    border: '1px solid rgb(224,224,224)',
                    padding: '4px',
                    borderRadius: '24px',
                }}
            >

                <Button
                    disabled
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '0px solid',
                        borderRadius: '24px',
                    }}
                >
                    <RemoveIcon fontSize="small" style={{color: `rgb(152, 152, 152)`}}/>
                </Button>

                <div
                    style={{
                        width: '41px',
                        height: '36px',
                        border: '0px solid',
                        borderRadius: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div style={{marginTop: '5px'}}>
                        <FacebookCircularProgress color="inherit" size={24}/>
                    </div>
                </div>


                <Button
                    disabled
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '0px solid',
                        borderRadius: '24px',
                    }}
                >
                    <AddIcon fontSize="small" style={{color: `rgb(152, 152, 152)`}}/>
                </Button>

            </ButtonGroup>
        </>
    )
}