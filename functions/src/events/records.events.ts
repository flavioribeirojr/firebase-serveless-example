import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { db } from 'src/config/firebase';

export const generateAutoIncrement = onDocumentCreated(
  '/records/{recordId}',
  async event => {
    const countQueryResult = await db.collection('records').count().get();
    const count = countQueryResult.data().count;

    return event.data?.ref.set({ increment_id: count }, {
      merge: true,
    });
  });
