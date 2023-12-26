import './App.css'
import {createContext, useEffect, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {UserData} from "./data/dto/UserDto.ts";
import * as FirebaseAuthService from ".//authService/FirebaseAuthService.ts"

import ProductListing from "./ui/page/ProductListing";
import ErrorPage from "./ui/page/ErrorPage";
import ProductDetail from './ui/page/ProductDetail';
import LoginPage from "./ui/page/LoginPage";
import ShoppingCart from "./ui/page/ShoppingCart";
import Checkout from './ui/page/Checkout/index.tsx';
import ThankYou from "./ui/page/ThankYou";
import * as CartItemApi from "./api/CartItemApi.ts";

export const LoginUserContext = createContext<UserData | null | undefined>(undefined);

export const CartItemLengthContext = createContext<number>(0);

export default function App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);
    const [cartItemLength, setCartItemLength] = useState<number>(0);

    const getCartItemListLength = async () => {
        if (loginUser) {
            const data = await CartItemApi.getCartItem();
            setCartItemLength(data.length);
        }
    }

    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    }, []);

    useEffect(() => {
        if (loginUser) {
            getCartItemListLength();
        }
    }, [loginUser]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProductListing/>,
            errorElement: <ErrorPage/>
        },
        {
            path: "/product/:productId",
            element: <ProductDetail/>
        },
        {
            path: "/shoppingcart",
            element: <ShoppingCart/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/checkout/:transactionId",
            element: <Checkout/>
        },
        {
            path: "/thankyou/:transactionId",
            element: <ThankYou/>
        },
        {
            path: "/error",
            element: <ErrorPage/>,
        }
    ])

    return (
        <>
            <LoginUserContext.Provider value={loginUser}>
                <CartItemLengthContext.Provider value={cartItemLength}>
                    <RouterProvider router={router}/>
                </CartItemLengthContext.Provider>
            </LoginUserContext.Provider>
        </>
    )
}