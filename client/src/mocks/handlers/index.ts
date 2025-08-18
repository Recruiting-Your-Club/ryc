import { applicantHandler } from './applicantHandler';
import { clubHandler } from './clubHandler';
import { evaluationHandler } from './evaluationHandler';
import { stepHandler } from './stepHandler';
import { announcementHandler } from './announcementHandler';
import { interviewHandler } from './interviewHandler';

const handlers = [...clubHandler, ...interviewHandler, ...announcementHandler, ...applicantHandler, ...evaluationHandler, ...stepHandler];

export { handlers };
