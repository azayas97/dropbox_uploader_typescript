import { container } from 'tsyringe';
import { AUTH_SERVICE_INTERFACE } from '../services/interfaces/IAuthService';
import { AuthService } from '../services/AuthService';
import { DROPBOX_UPLOAD_SERVICE_INTERFACE } from '../services/interfaces/IDropboxUploadService';
import { DropboxUploadService } from '../services/DropboxUploadService';
import { UploadFileService } from '../services/UploadFileService';
import { UPLOAD_FILE_SERVICE_INTERFACE } from '../services/interfaces/IUploadFileService';
import { LOG_SERVICE_INTERFACE } from '../services/interfaces/ILogService';
import { LogService } from '../services/LogService';

/**
 * RegisterServices class to register the services interfaces.
 */
export class RegisterServices {
    /**
     * Constructor to register the interfaces that will be used in the API.
     */
    constructor() {
        container.register(AUTH_SERVICE_INTERFACE, { useClass: AuthService });
        container.register(DROPBOX_UPLOAD_SERVICE_INTERFACE, { useClass: DropboxUploadService });
        container.register(UPLOAD_FILE_SERVICE_INTERFACE, { useClass: UploadFileService });
        container.register(LOG_SERVICE_INTERFACE, { useClass: LogService });
    }
}
