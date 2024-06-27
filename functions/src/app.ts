import express from 'express';
import { registerRecordsRoutes } from './routes/records.routes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Hey there!'));

registerRecordsRoutes(app);

export { app };
