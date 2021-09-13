import { Response } from 'express';
import { IBaseResponse } from './IBaseResponse';

/**
 * BaseAPIController abstract class to handle responses easier.
 */
export abstract class BaseApiController<Service> {
    service: Service

    response(res: Response, response: IBaseResponse<{}>): void {
        res.status(response.status).json(response);
    }
}
