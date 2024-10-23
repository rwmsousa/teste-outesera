import { Router } from 'express';
import { getProducersWithMinMaxInterval } from '../controllers/producer.controller';

const router = Router();

router.get('/producers', getProducersWithMinMaxInterval);

export default router;
