import axios, { AxiosInstance } from 'axios';

import { HttpOutput, HttpGateway } from '../http-gateway';

export class HttpGatewayImplementation implements HttpGateway {
    private _axiosInstance: AxiosInstance;

    public constructor() {
        this._axiosInstance = axios.create();
    }

    public async post(
        url: string,
        data: any = {},
        headers: Record<string, string | number> = {}
    ): Promise<HttpOutput> {
        try {
            const response = await this._axiosInstance.post(url, data, {
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

    public async get(
        url: string,
        headers: Record<string, string | number> = {}
    ): Promise<HttpOutput> {
        try {
            const response = await this._axiosInstance.get(url, {
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