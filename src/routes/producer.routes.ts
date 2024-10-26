import { Router } from 'express';
import { getProducersWithMinMaxInterval } from '../controllers/producer.controller';

const router = Router();

router.get('/', getProducersWithMinMaxInterval);

export default router;
