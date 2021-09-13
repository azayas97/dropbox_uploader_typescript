import * as express from 'express';
import { singleton } from 'tsyringe';
import multer = require('multer');
import { DropboxController } from '../../controllers/v1/DropboxController';

/**
 * File router class for Dropbox Controller
 */
@singleton()
export class FileRouter {
    // Declares the router from express.
    router: express.Router = express.Router();

    // Declares the controller as DropboxController
    controller: DropboxController;

    /**
     * Constructor to declare file routes and a file handler for the upload route.
     * @param controller Controller to handle the routes behaviour.
     */
    constructor(controller:DropboxController) {
        this.controller = controller;

        const upload = multer({ storage: multer.memoryStorage(), });

        this.router.post('/upload', upload.single('files'), controller.uploadFile);
    }
}
