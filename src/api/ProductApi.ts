import {ProductDetailDto, ProductListDto} from "../data/dto/ProductDto.ts";
import axios from 'axios';

const baseUrl = "http://localhost:8080"

export async function getAllProduct(): Promise<ProductListDto[]> {
    try {
        const response = await axios.get<ProductListDto[]>(`${baseUrl}/public/product`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getProductDetail(pid: string): Promise<ProductDetailDto> {
    try {
        const response = await axios.get<ProductDetailDto>(`${baseUrl}/public/product/${pid}`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// axios has better error handling.