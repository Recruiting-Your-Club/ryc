import { clubHandler } from './clubHandler';
import { presignedUrlHandler } from './presignedUrlHandler';

const handlers = [...clubHandler, ...presignedUrlHandler];

export { handlers };
