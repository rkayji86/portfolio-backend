import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoutes.js';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3000;
const allowedORIGIN = process.env.FRONTEND_URL || 'http://localhost:3000';
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(cors({
    origin: allowedORIGIN
}));
app.use(express.json());
app.use(helmet());
app.use(limiter);


app.get('/', (req, res) => {
    res.send('Hello Portfolio Backend!');
});

app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});