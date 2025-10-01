import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoutes.js';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3000;
const allowedORIGINS = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:5173', // Add more origins as needed,
    'https://portfolio-alpha-indol-61.vercel.app',
    'https://portfolio-git-development-rkayjis-projects.vercel.app',
    'https://portfolio-d7mpujgfx-rkayjis-projects.vercel.app'
];
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedORIGINS.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
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