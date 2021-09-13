import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';

import { ILogService } from './interfaces/ILogService';

import { BaseApiService } from '../utils/BaseApiService';
import { Strings as msg } from '../utils/Strings';
import { IBaseResponse } from '../utils/IBaseResponse';

import { Constants as constants } from '../helpers/constants';

import { Log } from '../database/entity/Log';

/**
 * LogService injectable class to handle the data and calls to the database.
 */
@injectable()
export class LogService extends BaseApiService<{}> implements ILogService {
    /**
     * Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * Method to create a log into the database and display it into the console.
     * @param {string} email Email field.
     * @param {string} filename Filename field.
     * @param {string} type Type field.
     * @param {string} message Message field.
     * @returns BaseResponse.
     */
    async createLog(email: string, filename: string, type: string, message: string):Promise<IBaseResponse<{}>> {
        try {
            // Declare the log object and set values into it.
            const log: Log = new Log();
            log.filename = filename;
            log.user = email;
            log.type = type;
            log.timestamp = String(+new Date());
            log.message = message;

            // Call to an async function to save Log data into the database.
            const data = getRepository(Log).create(log);
            await getRepository(Log).save(data);
            // Display the log info in the console.
            console.log(`[${email}] [${type}] ${message} - ${log.timestamp}`);

            return {
                success: true,
                status: constants.OKAY,
                message: null,
                data,
            };
        } catch (error) {
            console.log(error);

            return {
                success: false,
                status: constants.INTERNAL,
                message: msg.INTERNAL_ERROR,
                data: error,
            };
        }
    }

    /**
     * Method to get the logs from the database.
     * @returns BaseResponse.
     */
    async getLogs(): Promise<IBaseResponse<Log[]>> {
        try {
            // Call to an async function to get all log data from the database.
            const result = await getRepository(Log).find();
    
            return {
                success: true,
                status: constants.OKAY,
                message: null,
                data: result
            };
        } catch (error) {
            console.log(error);

            return {
                success: false,
                status: constants.INTERNAL,
                message: msg.INTERNAL_ERROR,
                data: error,
            };
        }
    }
}
