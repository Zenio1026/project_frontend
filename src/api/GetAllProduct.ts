import {ProductListDto} from "../data/dto/ProductDto.ts";
import axios from 'axios';

export const getAllProduct = async (): Promise<ProductListDto[]> => {
    try{
        const response = await axios.get<ProductListDto[]>("http://localhost:8080/public/product")
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// axios has better error handling.