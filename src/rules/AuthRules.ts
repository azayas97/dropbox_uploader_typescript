import * as bcrypt from 'bcryptjs';
import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import { User } from '../database/entity/User';

/**
 * AuthRoles class to validate the authentication data.
 */
@injectable()
export class AuthRules {
    // Method to verify if the password comparation is successful.
    isPasswordValid(user: User, password: string): boolean {
        return bcrypt.compareSync(password, user.password);
    }

    // Method to verify if the email is unique.
    async isEmailUnique(email: string): Promise<boolean> {
        const result = await getRepository(User).findOne({
            where: {
                email,
            },
        });

        return (result != undefined);
    }
}
