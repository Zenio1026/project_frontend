import TopNavBar from "../../component/TopNavBar.tsx";
import ProductCard from "./component/ProductCard.tsx";
import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/dto/ProductDto.ts";
import Loading from "../../component/Loading.tsx";
import * as GetAllProductApi from "../../../api/ProductApi.ts"
import {useNavigate} from "react-router-dom";

export default function ProductListing() {
    const [productList, setProductList] = useState<ProductListDto[] | undefined>(undefined);
     const navigate = useNavigate();

    const getAllProduct = async () => {
        try {
            const data = await GetAllProductApi.getAllProduct();
            setProductList(data)
        } catch (err) {
            navigate("/error")
        }
    }

    useEffect(() => {
        getAllProduct();
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