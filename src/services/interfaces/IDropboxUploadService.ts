import { IBaseResponse } from '../../utils/IBaseResponse';

export const DROPBOX_UPLOAD_SERVICE_INTERFACE = 'IDropboxUploadService';

/**
 * IDropboxUploadService interface to declare the uploadFile methods..
 */
export interface IDropboxUploadService {
    uploadFile: (filename: string) => Promise<IBaseResponse<{}>>;
}
