import assert from 'assert';
import { it, describe, afterEach } from 'mocha';
import { db } from 'src/config/firebase';
import { generateAutoIncrement } from 'src/events/records.events';
import test from 'test/firebase-test-functions';

describe('generateAutoIncrement', () => {
  afterEach(async function() {
    this.timeout(10_000);

    const allRecords = await db.collection('records').get();
    await Promise.all(
      allRecords.docs.map(doc => db.doc(doc.ref.path).delete())
    );
  });

  it('must add increment_id after record is created', async function() {
    this.timeout(10_000);

    const snap = test
      .firestore
      .makeDocumentSnapshot({ name: 'supertest' }, 'records/123');

    const wrapped = test.wrap(generateAutoIncrement);
    await wrapped({ data: snap, params: { recordId: 'brb' } });

    const created = await db
      .doc('records/123')
      .get();

    assert(created.data()?.increment_id !== undefined);
  });
});
