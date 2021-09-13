import * as express from 'express';
import { container } from 'tsyringe';

import { AuthRouter } from './v1/AuthRouter';
import { FileRouter } from './v1/FileRouter';
import { LogRouter } from './v1/LogRouter';

import { checkToken } from '../middlewares/jwtMiddleware';

/**
 * Router class to declare the routers and handle the middlewares.
 */
export class Routes {
    router = express.Router();

    /**
     * Constructor to declare routers and middlewares.
     */
    constructor() {
        // Resolves the routers.
        const authRouter = container.resolve(AuthRouter);
        const fileRouter = container.resolve(FileRouter);
        const logRouter = container.resolve(LogRouter);

        // Declares the routes.
        this.router.use('/v1/auth', authRouter.router);
        this.router.use('/v1/file', [checkToken], fileRouter.router);
        this.router.use('/v1/logs', [checkToken], logRouter.router);
    }
}
