import { setupServer } from 'msw/node';

import { handlers } from '../handlers';

const nodeServer = setupServer(...handlers);

export { nodeServer };
