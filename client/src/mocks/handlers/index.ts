import { clubHandler } from './clubHandler';
import { announcementHandler } from './announcementHandler';
import { interviewHandler } from './interviewHandler';
import { applicantHandler } from './applicantHandler';
import { stepHandler } from './stepHandler';

const handlers = [
    ...clubHandler,
    ...applicantHandler,
    ...interviewHandler,
    ...announcementHandler,
    ...stepHandler,
];

export { handlers };
