import { announcementHandler } from './announcementHandler';
import { clubHandler } from './clubHandler';
import { interviewHandler } from './interviewHandler';

const handlers = [...clubHandler, ...interviewHandler, ...announcementHandler];

export { handlers };
