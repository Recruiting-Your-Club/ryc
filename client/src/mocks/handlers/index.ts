import { clubHandler } from './clubHandler';
import { announcementHandler } from './announcementHandler';
import { interviewHandler } from './interviewHandler';

const handlers = [...clubHandler, ...interviewHandler, ...announcementHandler];

export { handlers };
