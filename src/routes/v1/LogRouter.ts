import * as express from 'express';
import { singleton } from 'tsyringe';
import { LogController } from '../../controllers/v1/LogController';

/**
 * Log router class for Dropbox Controller
 */
@singleton()
export class LogRouter {
    // Declares the router from express.
    router: express.Router = express.Router();

    // Declares the controller as LogController
    controller: LogController

    /**
     * Constructor to declare log routes.
     * @param controller Controller to handle the routes behaviour.
     */
    constructor(controller: LogController) {
        this.controller = controller;

        this.router.get('/get_all', controller.getLogs);
    }
}