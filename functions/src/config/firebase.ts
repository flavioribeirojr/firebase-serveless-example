import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

admin.initializeApp();

const db = getFirestore();
export { admin, db };
