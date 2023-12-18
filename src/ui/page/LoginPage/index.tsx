import Container from "@mui/material/Container";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TopNavBar from "../../component/TopNavBar.tsx";
import {useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {GoogleLoginButton} from "react-social-login-buttons";
import {LoginUserContext} from "../../../App.tsx";
import * as React from "react";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginUser = useContext(LoginUserContext);

    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (loginResult) {
            navigate(-1);
        } else {
            // TODO: Change to other
            alert("Login Failed!");
        }
    }

    useEffect(() => {
        if (loginUser) {
            navigate("/");
        }
    }, [loginUser])


    return (
        <>
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

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate sx={{mt: 1}}
                    >

                        {/*----- Email Address -----*/}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            autoFocus
                            onChange={handleEmailChange}
                            value={email}
                        />

                        {/*----- Password -----*/}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            value={password}
                        />

                        {/*----- Sign In Button -----*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>

                        <br/>
                        <br/>
                        <hr/>
                        <br/>
                    </Box>

                    {/*----- Google Sign In -----*/}
                    <GoogleLoginButton
                        style={{borderRadius: '24px', width: '220px'}}
                        onClick={() => {
                            FirebaseAuthService.handleSignInWithGoogle()
                        }}
                    >
                        <span>Sign in with Google</span>
                    </GoogleLoginButton>

                    {/*<AppleLoginButton*/}
                    {/*    style={{borderRadius: '24px', width: '220px'}}*/}
                    {/*    onClick={() => {*/}
                    {/*        FirebaseAuthService.handleSignInWithApple()*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <span>Sign in with Apple</span>*/}
                    {/*</AppleLoginButton>*/}

                </Box>
            </Container>
        </>
    )
}