import { clubHandler } from './clubHandler';
import { announcementHandler } from './announcementHandler';
import { interviewHandler } from './interviewHandler';
import { applicantHandler } from './applicantHandler';

const handlers = [...clubHandler, ...applicantHandler, ...interviewHandler, ...announcementHandler];

export { handlers };
