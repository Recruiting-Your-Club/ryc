import { applicantHandler } from './applicantHandler';
import { clubHandler } from './clubHandler';
import { evaluationHandler } from './evaluationHandler';
import { stepHandler } from './stepHandler';

const handlers = [...clubHandler, ...applicantHandler, ...stepHandler, ...evaluationHandler];

export { handlers };
