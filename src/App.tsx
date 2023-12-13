import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductListing from "./ui/page/ProductListing";
import ErrorPage from "./ui/page/ErrorPage";
import ProductDetail from './ui/page/ProductDetail';
import LoginPage from "./ui/page/LoginPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductListing/>
    },
    {
      path: "/product/:productId",
      element: <ProductDetail/>
    },
    // {
    //   path: "/shoppingcart",
    //   element: <ShoppingCart/>
    // },
    {
      path: "/login",
      element: <LoginPage/>
    },
    // {
    //   path: "/checkout/:transactionId",
    //   element: <Checkout/>
    // },
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
      <RouterProvider router={router} />
    </>
  )
}

export default App
