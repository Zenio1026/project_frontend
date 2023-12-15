import {useEffect} from "react";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import {Button} from "@mui/material";
import TopNavBar from "../../component/TopNavBar.tsx";

export default function ShoppingCart() {

    const putCartItem = async () => {
        await CartItemApi.putCartItem("1", 3);
    }

    useEffect(() => {
        putCartItem();
    }, [])

    return (
        <>
            <TopNavBar/>
            <h1>ShoppingCart</h1>
            <Button onClick={putCartItem}>PUT!</Button>
        </>
    )
}