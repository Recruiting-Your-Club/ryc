import { setupWorker } from 'msw/browser';

import { handlers } from '../handlers';

const browserServer = setupWorker(...handlers);

export { browserServer };
