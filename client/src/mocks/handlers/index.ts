import { applicantHandler } from './applicantHandler';
import { clubHandler } from './clubHandler';
import { emailHandler } from './emailHandler';
import { evaluationHandler } from './evaluationHandler';
import { stepHandler } from './stepHandler';

const handlers = [
    ...clubHandler,
    ...applicantHandler,
    ...stepHandler,
    ...evaluationHandler,
    ...emailHandler,
];

export { handlers };
