import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ProductListDto} from "../../../data/dto/ProductDto.ts";
import * as GetAllProductApi from "../../../api/ProductApi.ts"

import Footer from "./component/Footer.tsx";
import Loading from "../../component/Loading.tsx";
import ProductCard from "./component/ProductCard.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";

export default function ProductListing() {
    const navigate = useNavigate();

    const [productList, setProductList] = useState<ProductListDto[] | undefined>(undefined);
    const [searchValue, setSearchValue] = useState<string>('');

    const isSearching = searchValue !== "";

    const getAllProduct = async (searchValue: string) => {
        try {
            document.title = "GameStation";
            const data = await GetAllProductApi.getAllProduct();
            const filteredList = data.filter((product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setProductList(filteredList);
        } catch (e) {
            navigate("/error");
        }
    };

    const handleSearchValueChange = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => {
        getAllProduct(searchValue);
    }, [searchValue]);


    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <TopNavBar onSearchValueChange={handleSearchValueChange}/>
            {productList && productList.length > 0 ? (
                <>
                    <ProductCard productList={productList}/>

                    <div style={{marginTop: "auto"}}>
                        <Footer isSearching={isSearching}/>
                    </div>
                </>
            ) : (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px"}}>
                    {productList && productList.length === 0 ? (
                        <div>
                            <p style={{color: "snow", fontSize: "22px"}}>Sorry we found 0 results for</p>
                            <p style={{color: "snow", fontSize: "22px", fontWeight: "bold"}}>{searchValue}</p>
                        </div>
                    ) : (
                        <Loading/>
                    )}
                </div>
            )}
        </div>
    );
}