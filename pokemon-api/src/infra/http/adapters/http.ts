import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { Request, Response } from '../types';

export interface Controller {
    handle(request: Request): Promise<Response> | Response
}

export function httpAdapter(controller: Controller) {
    return async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const data = {
                body: request.body,
                headers: request.headers,
                params: request.params,
                query: request.query
            }

            const handle = await controller.handle(data)

            if (!handle) {
                return response.status(204).send()
            }

            return response.status(200).send(handle)
        } catch (error: any) {
            console.error(`[ERROR] :: `, error);

            return response.status(error?.statusCode ?? 500).send({
                message: error?.errorMessage ?? 'Internal Server Error'
            })
        }
    }
}