import functions from 'firebase-functions-test';
import path from 'path';
import fs from 'fs';

const serviceAccountFilePath = path.join(__dirname, 'service-account.json');
const serviceAccountJSON = JSON.parse(
  fs.readFileSync(serviceAccountFilePath).toString()
);

export default functions({
  projectId: serviceAccountJSON.project_id,
}, serviceAccountFilePath);
