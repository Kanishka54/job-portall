import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import * as Sentry from "@sentry/node";  // Import Sentry directly
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/Webhooks.js';

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database Connected Successfully");
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    // Your routes
    app.get('/', (req, res) => {
      res.send('Job Portal API is running!');
    });
    
    app.get("/debug-sentry", function mainHandler(req, res) {
      throw new Error("My first Sentry error!");
    });
    app.post('/webhooks',clerkWebhooks)
    
    
    // Sentry error handler - put this AFTER your routes
    Sentry.setupExpressErrorHandler(app);
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('Server failed:', error);
    process.exit(1);
  }
};

startServer();