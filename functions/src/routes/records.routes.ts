import { Request, Response, Application } from 'express';
import { db } from 'src/config/firebase';

export function registerRecordsRoutes(app: Application) {
  app
    .route('/records')
    .post(addRecord);

  async function addRecord(req: AddRecordRequest, res: Response) {
    try {
      const result = await db
        .collection('records')
        .add({ name: req.body.name });

      res.json({
        id: result.id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

interface AddRecordRequest extends Request {
  body: {
    name: string;
  };
}
