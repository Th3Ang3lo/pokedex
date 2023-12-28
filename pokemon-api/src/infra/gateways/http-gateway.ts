export interface HttpOutput<T = any> {
    statusCode: number;
    response: T;
}

export interface HttpGateway {
    post: <T = any>(url: string, data?: any, headers?: Record<string, string | number>) => Promise<HttpOutput<T>>;
    get: <T = any>(url: string, headers?: Record<string, string | number>) => Promise<HttpOutput<T>>;
}