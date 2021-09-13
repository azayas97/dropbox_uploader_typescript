import { Request, Response } from 'express';
import { inject, singleton } from 'tsyringe';
import { AUTH_SERVICE_INTERFACE, IAuthService } from '../../services/interfaces/IAuthService';
import { BaseApiController } from '../../utils/BaseApiController';
import { Constants as constants } from '../../helpers/constants';
import { Strings as msg } from '../../utils/Strings';

/**
 * Authentication controller that handles login and register from AuthService.
 */
@singleton()
export class AuthController extends BaseApiController<IAuthService> {
    /**
     * Constructor to inject IAuthService
     * @param {IAuthService} service Service to use for the methods.
     */
    constructor(@inject(AUTH_SERVICE_INTERFACE) service: IAuthService) {
        super();
        this.service = service;
    }

    /**
     * Login function that allows the user to log into the API.
     * @param {Request} req Request object from express.
     * @param {Rsponse} res Response object from express.
     * @returns Promise response.
     */
    login = async (req: Request, res: Response) => {
        // Created a badRequest object just because.
        const badRequest = {
            success: false,
            status: constants.BAD_REQUEST,
            message: msg.EMAIL_MISSING,
            data: null,
        };

        // Verifies if the body is null/undefined, returns badRequest response.
        if (!req.body) return this.response(res, badRequest);

        const { email, password } = req.body;

        // Verifies if the email is undefined, returns badRequest response.
        if (!email) return this.response(res, badRequest);

        // Calls login from the AuthService service.
        const result = await this.service.login(email, password);

        return this.response(res, result);
    }

    /**
     * Register function that accepts firstName, lastName, email and password.
     * @param {Request} req Request object from express.
     * @param {Rsponse} res Response object from express.
     * @returns Promise response.
     */
    register = async (req: Request, res: Response) => {
        // Gather firstName, lastName, email and password from request's body.
        const {
            firstName, lastName, email, password,
        } = req.body;

        const errorList: string[] = [];

        // Verify if every field is correct and valid.
        if (!firstName) errorList.push('El nombre es requerido.');
        if (!lastName) errorList.push('El apellido es requerido.');
        if (!email) errorList.push('El correo es requerido.');
        if (!password) errorList.push('La contraseña es requerida.');
        // If any of the fields were incorrect it returns a badRequest response.
        if (errorList.length > 0) {
            return this.response(res, {
                success: false,
                status: constants.BAD_REQUEST,
                message: msg.INCOMPLETE_REQUEST,
                data: errorList,
            });
        }

        // Calls the register from IAuthService service with the fields gathered previously.
        const result = await this.service.register(firstName, lastName, email, password);

        return this.response(res, result);
    }
}
