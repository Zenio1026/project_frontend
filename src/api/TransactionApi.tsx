import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import axios from "axios";

const baseUrl = "http://localhost:8080"

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken) {
        throw new Error("Access token not available");
    }
    return {headers: {Authorization: `Bearer ${accessToken}`}};
}

const getTranscationById = async (transactionId: string) => {
    try {
        const response = await axios.get<>()

    } catch (error) {
        console.error(error);
        throw error;
    }
}