import { injectable } from 'tsyringe';
import * as fs from 'fs';
import { Request } from 'express';

import { IUploadFileService } from './interfaces/IUploadFileService';

import { BaseApiService } from '../utils/BaseApiService';
import { Strings as msg } from '../utils/Strings';

/**
 * DropboxUploadService injectable class to handle the data and calls to the database.
 */
@injectable()
export class UploadFileService extends BaseApiService<{}> implements IUploadFileService {
    /**
     * Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * Method to save the file locally.
     * @param {Request} req Request object from express. 
     * @returns BaseResponse
     */
    async localUploadFile(req: Request) {
        await fs.createWriteStream(`${process.cwd()}\\files\\${req.file.originalname}`);

        return {
            success: true,
            status: 0,
            message: msg.FILE_UPLOADED,
            data: req.file.originalname,
        };
    }
}
