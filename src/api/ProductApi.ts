import {ProductDetailDto, ProductListDto} from "../data/dto/ProductDto.ts";
import axios from 'axios';

export async function getAllProduct(): Promise<ProductListDto[]> {
    try {
        const response = await axios.get<ProductListDto[]>("http://localhost:8080/public/product")
        return response.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getProductDetail(pid: string): Promise<ProductDetailDto> {
    try {
        const response = await axios.get<ProductDetailDto>(`http://localhost:8080/public/product/${pid}`)
        return response.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// axios has better error handling.