import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import {CartItemListDto} from "../data/dto/CartItemDto.ts";

const baseUrl = "http://localhost:8080"

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken) {
        throw new Error("Access token not available");
    }
    return {headers: {Authorization: `Bearer ${accessToken}`}};
}

// Add CartItem
export async function putCartItem(pid: string, quantity: number) {
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Get CartItem
export async function getCartItem(): Promise<CartItemListDto[]> {
    try {
        const response = await axios.get<CartItemListDto[]>(
            `${baseUrl}/cart`,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Update CartItem
export async function patchCartItem(pid: number, quantity: number) {
    try {
        await axios.patch(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Delete CartItem
export async function deleteCartItem(pid: number) {
    try {
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            await getAuthConfig()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}