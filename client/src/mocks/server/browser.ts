import { setupWorker } from 'msw/browser';
import { clubHandler } from '../handlers/clubHandler';

const browserServer = setupWorker(...clubHandler);

export { browserServer };
