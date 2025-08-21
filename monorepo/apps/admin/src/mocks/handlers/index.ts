import { announcementHandler } from './announcementHandler';
import { applicantHandler } from './applicantHandler';
import { clubHandler } from './clubHandler';
import { evaluationHandler } from './evaluationHandler';
import { interviewHandler } from './interviewHandler';
import { stepHandler } from './stepHandler';

const handlers = [
    ...clubHandler,
    ...interviewHandler,
    ...announcementHandler,
    ...applicantHandler,
    ...evaluationHandler,
    ...stepHandler,
];

export { handlers };
