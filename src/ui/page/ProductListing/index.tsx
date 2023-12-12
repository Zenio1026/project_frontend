import TopNavBar from "../../component/TopNavBar.tsx";
import ProductCard from "./component/ProductCard.tsx";
import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/dto/ProductDto.ts";
import Loading from "../../component/Loading.tsx";
import * as GetAllProduct from "../../../api/GetAllProduct.ts"

export default function ProductListing() {
    const [productList, setProductList] = useState<ProductListDto[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const products = await GetAllProduct.getAllProduct();
            setProductList(products)
            console.log(products)
        };
        fetchData();

    }, []);


    return (
        <>
            <TopNavBar/>
            {
                productList ?
                    <ProductCard productList={productList}/> : <Loading/>
            }
        </>
    )
}