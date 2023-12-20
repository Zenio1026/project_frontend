import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductListing from "./ui/page/ProductListing";
import ErrorPage from "./ui/page/ErrorPage";
import ProductDetail from './ui/page/ProductDetail';
import LoginPage from "./ui/page/LoginPage";
import ShoppingCart from "./ui/page/ShoppingCart";
import {createContext, useEffect, useState} from "react";
import {UserData} from "./data/dto/UserDto.ts";
import * as FirebaseAuthService from ".//authService/FirebaseAuthService.ts"
import Checkout from './ui/page/Checkout/index.tsx';

export const LoginUserContext = createContext<UserData | null | undefined>(undefined);

function App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    }, []);


    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProductListing/>
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
          path: "/checkout",
          element: <Checkout/>
        },
        // {
        //   path: "/thankyou",
        //   element: <ThankYou/>
        // }
        {
            path: "/error",
            element: <ErrorPage/>
        }
    ])

    return (
        <>
            <LoginUserContext.Provider value={loginUser}>
                <RouterProvider router={router}/>
            </LoginUserContext.Provider>
        </>
    )
}

export default App

// {
//     path: "/checkout/:transactionId",
//         element: <Checkout/>
// },