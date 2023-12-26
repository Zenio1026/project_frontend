import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
    isSearching: boolean;
}

export default function Footer({isSearching}: Props) {
    return (
        <>
            {isSearching ? null : (
                <Box sx={{backgroundColor: "snow", padding: 6}}>
                    <Typography variant="h6" align="center" gutterBottom>
                        <img src="./../../../../../public/marvel-logo.webp" style={{height: "53px"}}/>
                    </Typography>

                    <Typography align="center" sx={{fontSize: 14}}>
                        © 2021 MARVEL
                    </Typography>

                    <Typography align="center" sx={{fontSize: 14}}>
                        ©2021 Sony Interactive Entertainment LLC. Developed by Insomniac Games, Inc.
                    </Typography>
                </Box>
            )}

            <Box sx={{backgroundColor: "rgb(0,67,156)", padding: 6}}>
                <Typography variant="h6" align="left" gutterBottom>
                    <img src="./../../../../../public/sony-ie.png"/>
                </Typography>

                <Typography
                    component="h1"
                    sx={{
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                    }}
                >
                    © 2023 Sony Interactive Entertainment LLC
                    <br/>
                    All content, games titles, trade names and/or trade dress, trademarks, artwork and associated
                    imagery are
                    trademarks and/or copyright material of their respective owners. All rights reserved.
                </Typography>
            </Box>
        </>
    );
}