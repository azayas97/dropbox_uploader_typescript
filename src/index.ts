import 'reflect-metadata';
import * as express from 'express';
import * as https from 'https';
import * as cors from 'cors';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { Routes } from './routes/router';
import { RegisterServices } from './di/RegisterServices';

/**
 * Creates a connection to the database before setting up the server.
 */
createConnection()
    .then(() => {
        // Registers the services that will be used.
        const registerServices = new RegisterServices();
        registerServices;

        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(cors());
        app.use(new Routes().router);

        // Creates a secure server.
        https.createServer({
            key: fs.readFileSync(process.env.HTTPS_KEY),
            cert: fs.readFileSync(process.env.HTTPS_CERT),
        }, app)
            .listen(8120, () => {
                console.log('Dropbox test service started at 8120');
            });
    })
    .catch((error) => {
        console.log(error);
    });
