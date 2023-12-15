import {ThemeProvider} from "@emotion/react";
import Container from "@mui/material/Container";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme} from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TopNavBar from "../../component/TopNavBar.tsx";
import {useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginPage() {
    // const [email, setEmail] = useState<string>();
    // const [password, setPassword] = useState<string>();
    //
    // const navigate
    //
    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // }
    //
    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // }
    //
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword();
    // }


    return (
        <ThemeProvider theme={defaultTheme}>
            <TopNavBar/>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}