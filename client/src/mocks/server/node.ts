import { setupServer } from 'msw/node';
import { handlers } from '../handlers';

const nodeServer = setupServer(...handlers);

beforeAll(() => {
    nodeServer.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
    nodeServer.resetHandlers();
});

afterAll(() => {
    nodeServer.close();
});

export { nodeServer };
