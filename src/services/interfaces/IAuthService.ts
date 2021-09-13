import { IAuthResponse } from '../../models/IAuthResponse';
import { IBaseResponse } from '../../utils/IBaseResponse';

export const AUTH_SERVICE_INTERFACE = 'IAuthService';

/**
 * IAuthService interface to declare the login, register methods.
 */
export interface IAuthService {
    login: (email: string, password: string) => Promise<IBaseResponse<IAuthResponse>>;
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<IBaseResponse<{}>>;
}
