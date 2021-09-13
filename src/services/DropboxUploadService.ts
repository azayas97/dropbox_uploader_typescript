import { injectable } from 'tsyringe';
import * as fs from 'fs';
import axios from 'axios';

import { IDropboxUploadService } from './interfaces/IDropboxUploadService';

import { BaseApiService } from '../utils/BaseApiService';
import { Strings as msg } from '../utils/Strings';

import { Constants as constants } from '../helpers/constants';

/**
 * DropboxUploadService injectable class to handle the data and calls to the database.
 */
@injectable()
export class DropboxUploadService extends BaseApiService<{}> implements IDropboxUploadService {
    /**
     * Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * Method to upload files to Dropbox
     * @param {string} filename 
     * @returns BaseResponse
     */
    async uploadFile(filename: string) {
        try {
            // Declares a constant where the axios request will be made.
            const request = await axios({
                url: `${constants.DROPBOX_CONTENT}${constants.UPLOAD_FILE}`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.DROPBOX_TOKEN}`,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-ARG': `{ "path": "/OTA/${filename}" }`,
                },
                data: Buffer.from(fs.readFileSync(`${process.cwd()}\\files\\${filename}`)),
            });

            return {
                success: true,
                status: constants.OKAY,
                message: msg.FILE_UPLOADED,
                data: request.data,
            };
        } catch (err) {
            return {
                success: false,
                status: constants.BAD_REQUEST,
                message: msg.FILE_NOT_UPLOADED,
                data: err,
            };
        }
    }
}
