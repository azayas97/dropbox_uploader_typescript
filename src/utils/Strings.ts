/**
 * Abstract class to declare string constants.
 */
export abstract class Strings {
    // General
    static readonly INTERNAL_ERROR: string = 'Algo salio mal.';

    // AuthService
    static readonly EMAIL_NOT_FOUND: string = 'El correo no existe.';
    static readonly WRONG_PASSWORD: string = 'La contraseña es incorrecta.';
    static readonly LOGIN_SUCCESSFUL: string = 'Inicio de sesion exitoso.';
    static readonly EMAIL_MISSING: string = 'El correo es requerido.';
    static readonly INCOMPLETE_REQUEST: string = 'Hay campos vacios.';

    // DropboxUploadService
    static readonly FILE_UPLOADED: string = 'El archivo se subio a dropbox con exito.';
    static readonly FILE_MISSING: string = 'Seleccione un archivo para subir a dropbox.';
    static readonly FILE_NOT_UPLOADED: string = 'No se pudo subir el archivo a dropbox.';

    // LogService

    // AuthService
    static readonly USER_CREATED: string = 'Usuario creado con exito.';
    static readonly EMAIL_NOT_UNIQUE: string = 'El correo ya existe.';
}
