import { clubHandler } from './clubHandler';
import { announcementHandler } from './announcementHandler';

const handlers = [...clubHandler, ...announcementHandler];

export { handlers };
