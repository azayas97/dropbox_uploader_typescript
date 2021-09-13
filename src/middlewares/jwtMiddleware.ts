import { Constants as constants } from '../helpers/constants';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IBaseResponse } from '../utils/IBaseResponse';

/**
 * CheckToken function in order to verify if the token is valid.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {void} Void
 */
export const checkToken = (req: Request, res: Response, next: NextFunction): void => {
    // Get the token from the headers.
    const token = <string>req.headers['auth-token'];

    let jwtPayload;

    try {
        // Verifies if the token is valid.
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        // In case the token is invalid returns an Unauthorized response.
        const response: IBaseResponse<null> = {
            success: false,
            status: constants.UNAUTHORIZED,
            message: 'Sesion expirada, inicia sesion de nuevo.',
            data: null,
        };

        res.status(constants.UNAUTHORIZED).send(response);
        return;
    }

    // Gathers the userId and username from the JWTPayload.
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
        expiresIn: '6h',
    });

    // Sets the new token into the auth-token header.
    res.setHeader('auth-token', newToken);

    next();
};
