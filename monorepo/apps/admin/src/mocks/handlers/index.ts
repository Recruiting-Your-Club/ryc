import { applicantHandler } from './applicantHandler';
import { clubHandler } from './clubHandler';
import { evaluationHandler } from './evaluationHandler';
import { interviewHandler } from './interviewHandler';
import { stepHandler } from './stepHandler';

const handlers = [
    ...clubHandler,
    ...interviewHandler,
    ...applicantHandler,
    ...evaluationHandler,
    ...stepHandler,
];

export { handlers };
