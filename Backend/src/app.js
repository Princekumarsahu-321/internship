import express from 'express'; 
import cookieParser from 'cookie-parser'; 
import { router as authRouter } from "./routes/user.route.js";
import propertyRouter from './routes/property.route.js'; 
import bookingRouter from './routes/booking.route.js'; 
import tripRouter from "./routes/trip.route.js";

const app = express(); 

// FIX: Disable the X-Powered-By header to prevent fingerprint disclosure
// app.disable('x-powered-by'); 

app.use(express.json()); 
app.use(cookieParser()); 

app.use('/api/auth/user', authRouter); 
app.use('/api/properties', propertyRouter); 
app.use('/api/booking', bookingRouter); 
app.use("/api/trip", tripRouter);

export default app;
