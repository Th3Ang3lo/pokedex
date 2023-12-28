import axios from 'axios';

interface HttpOutput<T = any> {
    statusCode: number;
    response: T
}

export class HttpGateway {
    public static async post<T = any>(
        url: string,
        data: any = {},
        headers: Record<string, string | number> = {}
    ): Promise<HttpOutput<T>> {
        try {
            const response = await axios.post(url, data, {
                headers
            });

            return {
                statusCode: response.status,
                response: response.data,
            };
        } catch (error: any) {
            return {
                statusCode: error.response.status,
                response: error.response.data
            };
        }
    }

    public static async get<T = any>(
        url: string,
        headers: Record<string, string | number> = {}
    ): Promise<HttpOutput<T>> {
        try {
            const response = await axios.get(url, {
                headers
            });

            return {
                statusCode: response.status,
                response: response.data,
            };
        } catch (error: any) {
            return {
                statusCode: error.response.status,
                response: error.response.data
            };
        }
    }
}