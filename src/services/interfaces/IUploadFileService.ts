import { Request } from 'express';
import { IBaseResponse } from '../../utils/IBaseResponse';

export const UPLOAD_FILE_SERVICE_INTERFACE = 'IUploadFileService';

/**
 * IUploadFileService interface to declare the localUploadFile methods.
 */
export interface IUploadFileService {
    localUploadFile: (req: Request) => Promise<IBaseResponse<{}>>;
}
