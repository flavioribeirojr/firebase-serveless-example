import { onRequest } from 'firebase-functions/v2/https';
import { app } from './app';

export const appFunction = onRequest(app);

export * from './events';
