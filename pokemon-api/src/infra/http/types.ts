export type HttpBody<T = any> = { body?: T };
export type HttpQuery<T = any> = { query?: T };
export type HttpParams<T = any> = { params?: T };
export type HttpHeaders<T = any> = { headers?: T };
export type HttpFile<T = any> = { file?: T };
export type HttpFiles<T = any> = { files?: T[] };

export type Request = Partial<HttpBody & HttpQuery & HttpParams & HttpHeaders & HttpFile & HttpFiles>;
export type Response = Record<string, any> | void;

export type HttpController = (request: Request) => Promise<Response>;