import * as express from 'express';
import { singleton } from 'tsyringe';
import { AuthController } from '../../controllers/v1/AuthController';

/**
 * Router class for AuthController.
 */
@singleton()
export class AuthRouter {
    // Declares the router from express.
    router: express.Router = express.Router();

    // Declares the controller as AuthController.
    controller: AuthController;

    /**
     * Constructor to declare auth router routes.
     * @param {AuthController} controller Controller to handle the routes behaviour.
     */
    constructor(controller:AuthController) {
        this.controller = controller;

        this.router.post('/login', controller.login);
        this.router.post('/register', controller.register);
    }
}
