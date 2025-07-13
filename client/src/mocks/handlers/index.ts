import { applicantHandler } from './applicantHandler';
import { clubHandler } from './clubHandler';

const handlers = [...clubHandler, ...applicantHandler];

export { handlers };
