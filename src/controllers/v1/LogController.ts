import { Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import { ILogService, LOG_SERVICE_INTERFACE } from "../../services/interfaces/ILogService";
import { BaseApiController } from "../../utils/BaseApiController";

/**
 * LogController that will handle only getLogs from LogService.
 */
@singleton()
export class LogController extends BaseApiController<ILogService> {
    /**
     * Construction to inject LogService.
     * @param {ILogService} service 
     */
    constructor(@inject(LOG_SERVICE_INTERFACE) service: ILogService) {
        super();
        this.service = service;
    }

    /**
     * GetLogs function that allows the user to get all the upload to dropbox attempts logs.
     * @param {Request} req Request object from express.
     * @param {Response} res Response object from express.
     * @returns Promise response.
     */
    getLogs = async (req: Request, res: Response) => {
        // Get the logs from the LogService service.
        let result = await this.service.getLogs();
        return this.response(res, result);
    }
}