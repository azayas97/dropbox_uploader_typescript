/**
 * Constants class
 */
export abstract class Constants {
    // HTTP codes
    static readonly OKAY: number = 200;
    static readonly BAD_REQUEST: number = 400;
    static readonly UNAUTHORIZED: number = 401;
    static readonly NOT_FOUND: number = 404;
    static readonly INTERNAL: number = 500;

    // Strings
    static readonly DROPBOX_HOSTNAME: string = 'https://api.dropboxapi.com';
    static readonly DROPBOX_CONTENT: string = 'https://content.dropboxapi.com';
    static readonly LIST_FOLDER: string = '/2/files/list_folder';
    static readonly UPLOAD_FILE: string = '/2/files/upload';
}
