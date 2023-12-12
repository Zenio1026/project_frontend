import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductListing from "./ui/page/ProductListing";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductListing/>
    },
    // {
    //   path: "/product/:productId/:userId",
    //   element: <ProductDetail/>
    // },
    // {
    //   path: "/shoppingcart",
    //   element: <ShoppingCart/>
    // },
    // {
    //   path: "/login",
    //   element: <LoginPage/>
    // },
    // {
    //   path: "/checkout/:transactionId",
    //   element: <Checkout/>
    // },
    // {
    //   path: "/thankyou",
    //   element: <ThankYou/>
    // }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
