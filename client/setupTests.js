import { nodeServer } from '@mocks/server/node';

beforeAll(() => nodeServer.listen())

afterEach(() => nodeServer.resetHandlers())

afterAll(() => nodeServer.close())