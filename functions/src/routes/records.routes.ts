import { Request, Response, Application } from 'express';
import { db } from 'src/config/firebase';
import { z } from 'zod';
import { validateBody } from './utils/body-validation';

export function registerRecordsRoutes(app: Application) {
  const addRecordBodySchema = z.object({
    name: z.string().min(1),
  });

  app
    .route('/records')
    .post(
      validateBody(addRecordBodySchema),
      addRecord
    );

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
