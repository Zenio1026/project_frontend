import {CircularProgress, circularProgressClasses, CircularProgressProps} from "@mui/material";
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

export default function DeleteItemSkeleton() {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/*<div style={{marginTop: '4px'}}>*/}
                    <FacebookCircularProgress color="inherit" size={39}/>
                {/*</div>*/}
            </div>

        </>

    )

}