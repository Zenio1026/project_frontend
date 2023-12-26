import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
    alpha,
    // Badge,
    // BadgeProps,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    InputBase,
    ListItemIcon,
    styled
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import {LoginUserContext} from "../../App.tsx";
// import * as CartItemApi from "../../api/CartItemApi.ts"
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts"

type Props = {
    onSearchValueChange?: (searchValue: string)=> void;
}

// Custom Mui Component Style
const paperStyles = {
    elevation: 0,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: "48px",
    '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        backgroundColor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
    },
};
// const StyledBadge = styled(Badge)<BadgeProps>(({theme}) => ({
//     '& .MuiBadge-badge': {
//         border: `2px solid ${theme.palette.background.paper}`,
//         padding: '0 4px',
//     },
// }));

// Custom Mui Search-Bar Style
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(1),
    width: '48px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '0',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function TopNavBar({onSearchValueChange}: Props) {
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [searchValue, setSearchValue] = useState('');

    // const [cartItemLength, setCartItemLength] = useState<number>(0);

    // ---------- Dialog ----------
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    // ---------- TopNavBar ----------
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // ---------- Search function ----------
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        if (onSearchValueChange){
            onSearchValueChange(value);
        }
    }

    // ---------- MenuItem ----------
    const handleLoginClick = () => {
        navigate("/login")
    };
    const handleLogoutClick = () => {
        FirebaseAuthService.handleSignOut();
        handleClose();
        navigate("/")
    };
    const handleShoppingCartClick = () => {
        navigate("/shoppingcart")
    }

    // ---------- Call CartItem Api ----------
    // const getCartItemListLength = async () => {
    //     try {
    //         const data = await CartItemApi.getCartItem();
    //         setCartItemLength(data.length);
    //     } catch (error) {
    //         navigate("/error")
    //     }
    // }
    //
    // useEffect(() => {
    //     if (loginUser) {
    //         getCartItemListLength();
    //     }
    // }, [loginUser])

    return (
        <React.Fragment>
            <AppBar position='sticky' sx={{backgroundColor: 'black'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <SportsEsportsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            GameStation
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}>

                                <MenuItem
                                    key="goHome"
                                    onClick={() => {
                                        navigate("/")
                                    }}>
                                    <Typography textAlign="center">Products</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                        <SportsEsportsIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GameStation
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                onClick={() => {
                                    navigate("/")
                                }}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Products
                            </Button>
                        </Box>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon style={{fontSize: '28px'}}/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                type="search"
                                name="search"
                                placeholder="Search..."
                                inputProps={{'aria-label': 'search'}}
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </Search>

                        {/* ----- User Menu -----*/}
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                {
                                    loginUser ? (
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt={loginUser.email} src="/"
                                                    sx={{width: 36, height: 36, fontSize: '20px'}}/>
                                        </IconButton>
                                    ) : loginUser === null ? (
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <AccountCircleIcon style={{color: 'grey', width: 36, height: 36}}/>
                                        </IconButton>
                                    ) : (
                                        <Box sx={{display: 'flex'}}>
                                            <Avatar alt="  " src="/"
                                                    sx={{width: 36, height: 36, fontSize: '20px'}}/>
                                        </Box>
                                    )
                                }
                            </Tooltip>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                keepMounted
                                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                slotProps={{paper: {elevation: 0, sx: paperStyles}}}
                            >
                                {loginUser ? (
                                    [
                                        <MenuItem key="avatar" disabled style={{pointerEvents: 'none', opacity: 1}}>
                                            <ListItemIcon>
                                                <AccountCircleIcon style={{color: 'grey', width: 24, height: 24}}/>
                                            </ListItemIcon>
                                            <Typography textAlign="center">{loginUser.email}</Typography>
                                        </MenuItem>,

                                        <Divider key="divider"/>,

                                        <MenuItem key="cart" onClick={handleShoppingCartClick}>
                                            <ListItemIcon>
                                                {/*<StyledBadge badgeContent={cartItemLength} color="primary">*/}
                                                    <ShoppingCartIcon fontSize="small"/>
                                                {/*</StyledBadge>*/}
                                            </ListItemIcon>
                                            <Typography textAlign="center">Shopping Cart</Typography>
                                        </MenuItem>,

                                        <MenuItem key="sign-out" onClick={handleClickOpen}>
                                            <ListItemIcon>
                                                <Logout fontSize="small"/>
                                            </ListItemIcon>
                                            <Typography textAlign="center">Sign Out</Typography>
                                        </MenuItem>
                                    ]
                                ) : (
                                    <MenuItem key="sign-in" onClick={handleLoginClick}>
                                        <ListItemIcon>
                                            <Login fontSize="small"/>
                                        </ListItemIcon>
                                        <Typography textAlign="center">Sign In</Typography>
                                    </MenuItem>
                                )}
                            </Menu>

                            <Dialog
                                open={openDialog}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Do you want to sign out of GameStation?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button onClick={handleLogoutClick} autoFocus>
                                        Sign out
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}