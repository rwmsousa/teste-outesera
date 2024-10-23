import express from 'express';
import dotenv from 'dotenv';
import producerRoutes from './routes/producer.routes';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use('/', producerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
