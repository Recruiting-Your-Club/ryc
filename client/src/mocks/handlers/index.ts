import { applicantHandler } from './applicantHandler';
import { clubHandler } from './clubHandler';
import { stepHandler } from './stepHandler';

const handlers = [...clubHandler, ...applicantHandler, ...stepHandler];

export { handlers };
