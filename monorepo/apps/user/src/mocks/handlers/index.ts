import { announcementHandler } from './announcementHandler';
import { clubHandler } from './clubHandler';

const handlers = [...clubHandler, ...announcementHandler];

export { handlers };
