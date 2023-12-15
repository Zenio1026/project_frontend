import axios from "axios";
import * as FirebaseAuthServie from "../authService/FirebaseAuthService.ts"

const baseUrl = "http://localhost:8080"

export async function putCartItem(pid: string, quantity: number) {
    try {
        const accessToken = await FirebaseAuthServie.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }
        const config = {headers: {Authorization: `Bearer ${accessToken}`}}
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            config
        )
    } catch (error) {
        console.error(error);
        throw error;
    }

}