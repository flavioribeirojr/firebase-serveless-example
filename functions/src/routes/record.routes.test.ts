import 'test/firebase-test-functions';
import { db } from 'src/config/firebase';
import request from 'supertest';
import { app } from 'src/app';
import assert from 'assert';
import { afterEach } from 'mocha';

describe('RecordsRoutes', () => {
  afterEach(async function() {
    this.timeout(10_000);

    const allRecords = await db.collection('records').get();
    await Promise.all(
      allRecords.docs.map(doc => db.doc(doc.ref.path).delete())
    );
  });

  it('must match the response body', async () => {
    const response = await request(app)
      .post('/records')
      .set({ 'content-type': 'application/json' })
      .send({ name: 'some_name' });

    assert(response.body.id !== undefined);
  });

  it('must create a new record with the given name', async () => {
    await request(app)
      .post('/records')
      .set({ 'content-type': 'application/json' })
      .send({ name: 'some_name' });

    const records = await db
      .collection('records')
      .where('name', '==', 'some_name')
      .get();

    const [ created ] = records.docs;

    assert(created.data().name === 'some_name');
  });
});
