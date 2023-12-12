import {ProductListDto} from "../data/dto/ProductDto.ts";
import axios from 'axios';

export const getAllProduct = async (): Promise<ProductListDto> => {
    const response = await axios.get<ProductListDto>("http://localhost:8080/public/product")
    return response.data
}