import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';

import { IAuthService } from './interfaces/IAuthService';

import { IBaseResponse } from '../utils/IBaseResponse';
import { BaseApiService } from '../utils/BaseApiService';
import { Strings as msg } from '../utils/Strings';

import { Constants as constants } from '../helpers/constants';

import { IAuthResponse } from '../models/IAuthResponse';

import { User } from '../database/entity/User';

import { AuthRules } from '../rules/AuthRules';

/**
 * AuthService injectable class to handle the data and calls to the database.
 */
@injectable()
export class AuthService extends BaseApiService<AuthRules> implements IAuthService {
    /**
     * Constructor to declare the AuthRules.
     * @param {AuthRules} rules Rules to validate the database data. 
     */
    constructor(rules: AuthRules) {
        super();
        this.rules = rules;
    }

    /**
     * Login method that looks for a user into the database and checks its data.
     * @param {string} email Email field.
     * @param {string} password Password field.
     * @returns {Promise<IBaseResponse<IAuthResponse>>} Promise response.
     */
    async login(email: string, password: string): Promise<IBaseResponse<IAuthResponse>> {
        // Declares a User object.
        let user: User;
        try {
            // Gets the user data, if the user is not found throws an error.
            user = await getRepository(User).findOneOrFail({ where: { email } });
        } catch (error) {
            return {
                success: false,
                status: constants.NOT_FOUND,
                message: msg.EMAIL_NOT_FOUND,
                data: null,
            };
        }

        // If the password is incorrect it returns an unauthorized response.
        if (!this.rules.isPasswordValid(user, password)) {
            return {
                success: false,
                status: constants.UNAUTHORIZED,
                message: msg.WRONG_PASSWORD,
                data: null,
            };
        }

        // Creates a token signing the userId and username.
        const token = jwt.sign({
            userId: user.id,
            username: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '6h',
        });

        return {
            success: true,
            status: constants.OKAY,
            message: msg.LOGIN_SUCCESSFUL,
            data: {
                token,
                email,
            },
        };
    }

    /**
     * 
     * @param firstName 
     * @param lastName 
     * @param email 
     * @param password 
     * @returns 
     */
    async register(firstName: string, lastName: string, email: string, password: string): Promise<IBaseResponse<{}>> {
        try {
            const isUnique = await this.rules.isEmailUnique(email);

            if (isUnique) {
                return {
                    success: false,
                    status: constants.BAD_REQUEST,
                    message: msg.EMAIL_NOT_UNIQUE,
                    data: null,
                };
            }
        } catch (error) {
            return {
                success: false,
                status: constants.INTERNAL,
                message: msg.INTERNAL_ERROR,
                data: error,
            };
        }

        try {
            const user: User = new User();
            user.first_name = firstName;
            user.last_name = lastName;
            user.email = email;
            user.password = password;
            user.hashPassword();

            const data = getRepository(User).create(user);

            await getRepository(User).save(data);

            return {
                success: true,
                status: constants.OKAY,
                message: msg.USER_CREATED,
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
}
