import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import {CartItemListDto} from "../data/dto/CartItemDto.ts";

const baseUrl = "http://localhost:8080"

// Add CartItem
export async function putCartItem(pid: string, quantity: number) {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error("Access token not available");
        }
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        await axios.put(`${baseUrl}/cart/${pid}/${quantity}`, null, config);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Get CartItem
export async function getCartItem(): Promise<CartItemListDto[]> {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error("Access token not available");
        }
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        const response = await axios.get<CartItemListDto[]>(`${baseUrl}/cart`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Update CartItem
export async function patchCartItem(pid: number, quantity: number) {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error("Access token not available");
        }
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        await axios.patch(`${baseUrl}/cart/${pid}/${quantity}`, null, config);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Delete CartItem
export async function deleteCartItem(pid: number) {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error("Access token not available");
        }
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        await axios.delete(`${baseUrl}/cart/${pid}`, config)
    } catch (error) {
        console.error(error);
        throw error;
    }
}