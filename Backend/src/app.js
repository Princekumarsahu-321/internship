import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import { router as authRouter } from "./routes/user.route.js";
import propertyRouter from './routes/property.route.js';
import bookingRouter from './routes/booking.route.js';
import tripRouter from "./routes/trip.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth/user', authRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/trip', tripRouter);

// React frontend
app.use(express.static(path.join(__dirname, "../public")));

app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
        return next();
    }

    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;