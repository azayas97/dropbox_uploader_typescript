import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { inject, singleton } from 'tsyringe';

import { Constants as constants } from '../../helpers/constants';

import { DROPBOX_UPLOAD_SERVICE_INTERFACE, IDropboxUploadService } from '../../services/interfaces/IDropboxUploadService';
import { IUploadFileService, UPLOAD_FILE_SERVICE_INTERFACE } from '../../services/interfaces/IUploadFileService';
import { ILogService, LOG_SERVICE_INTERFACE } from '../../services/interfaces/ILogService';

import { Strings as strings } from '../../utils/Strings';
import { BaseApiController } from '../../utils/BaseApiController';

/**
 * Dropbox controller that handles uploadFile from DropboxUploadService service.
 */
@singleton()
export class DropboxController extends BaseApiController<IDropboxUploadService> {
    // Needed services to make the DropboxController work correctly.
    localService: IUploadFileService;
    logService: ILogService;

    /**
     * Constructor to inject UploadFileService, DropboxUploadService and LogService.
     * @param {IUploadFileService} localService 
     * @param {IDropboxUploadService} service 
     * @param {ILogService} logService 
     */
    constructor(@inject(UPLOAD_FILE_SERVICE_INTERFACE) localService: IUploadFileService, @inject(DROPBOX_UPLOAD_SERVICE_INTERFACE) service: IDropboxUploadService, @inject(LOG_SERVICE_INTERFACE) logService: ILogService) {
        super();
        this.service = service;
        this.localService = localService;
        this.logService = logService;
    }

    /**
     * UploadFile function that allows the user to upload files directly to dropbox using the API and creates Logs that will display who and what was uploaded to dropbox.
     * STEPS
     * 1. Get the user data from Token
     * 2. Save the file locally.
     * 3. Uploads the file directly into Dropbox.
     * 
     * @param {Request} req Request object from express.
     * @param {Response} res Response object from express.
     * @returns Promise response.
     */
    uploadFile = async (req: Request, res: Response) => {
        // Step 1. Get the user data from Token.
        const token = <string>req.headers['auth-token'];
        const jwtPayload: any = jwt.verify(token, process.env.JWT_SECRET);

        // If file is undefined returns a badRequest response.
        if (!req.file) {
            return this.response(res, {
                success: false,
                status: constants.BAD_REQUEST,
                message: strings.FILE_MISSING,
                data: null,
            });
        }

        // Step 2. Save the file locally.
        const logSuccess = await this.logService.createLog(jwtPayload.username, req.file.originalname, 'INFO', 'Saving file on the server.');
        if (!logSuccess) {
            return this.response(res, logSuccess);
        }

        let result = await this.localService.localUploadFile(req);
        // Create log in case the file could not be saved locally, also returns a response.
        if (!result.success) {
            await this.logService.createLog(jwtPayload.username, req.file.originalname, 'ERROR', `Could not save file locally. Reason: ${result}.`);
            return this.response(res, result);
        }
        // Get the filename into a constant.
        const filename: string = result.data.toString();

        // Step 3. Uploads the file directly into Dropbox.
        await this.logService.createLog(jwtPayload.username, req.file.originalname, 'INFO', 'Uploading file to Dropbox.');
        result = await this.service.uploadFile(filename);
        // Create log in case the file could not be uploaded to Dropbox, also returns a response.
        if (!result.success) {
            await this.logService.createLog(jwtPayload.username, req.file.originalname, 'ERROR', `Could not upload file to Dropbox. Reason: ${result}.`);
            return this.response(res, result);
        }

        // Creates a success log in case the file was uploaded to Dropbox.
        await this.logService.createLog(jwtPayload.username, req.file.originalname, 'INFO', 'File uploaded successfully to Dropbox.');
        return this.response(res, result);
    }
}
