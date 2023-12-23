import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import {TransactionDto} from "../data/dto/TransactionDto.ts";

const baseUrl = "http://localhost:8080"

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken) {
        throw new Error("Access token not available");
    }
    return {headers: {Authorization: `Bearer ${accessToken}`}};
}

export async function prepareTransaction(): Promise<TransactionDto> {
    try {
        const response = await axios.post<TransactionDto>(
            `${baseUrl}/transaction/prepare`,
            null,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTransactionById(transactionId: string): Promise<TransactionDto> {
    try {
        const response = await axios.get<TransactionDto>(
            `${baseUrl}/transaction/${transactionId}`,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function payTransactionById(transactionId: string): Promise<void> {
    try {
        await axios.patch(
            `${baseUrl}/transaction/${transactionId}/pay`,
            null,
            await getAuthConfig()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function finishTransactionById(transactionId: string): Promise<TransactionDto> {
    try {
        const response = await axios.patch<TransactionDto>(
            `${baseUrl}/transaction/${transactionId}/finish`, null,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}