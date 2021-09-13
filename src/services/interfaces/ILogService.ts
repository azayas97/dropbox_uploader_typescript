import { Log } from '../../database/entity/Log';
import { IBaseResponse } from '../../utils/IBaseResponse';

export const LOG_SERVICE_INTERFACE = 'ILogService';

/**
 * ILogService interface to declare the createLog, getLogs methods.
 */
export interface ILogService {
    createLog: (email: string, filename: string, type: string, message: string) => Promise<IBaseResponse<{}>>;
    getLogs: () => Promise<IBaseResponse<Log[]>>;
}
