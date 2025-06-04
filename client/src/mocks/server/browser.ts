import { setupWorker } from 'msw/browser';
import { clubHandler } from '../handlers/clubHandler';
import { handlers } from '../handlers';

const browserServer = setupWorker(...handlers);

export { browserServer };
