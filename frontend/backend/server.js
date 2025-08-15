import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import userRoutes from './routes/userRoutes.js';
import { ClerkWebhook } from './controllers/Controller.js';





// ======================
// Initialize Sentry
// ======================
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://33d2cc89429421ca58fb565ea623877a@o4509837899595776.ingest.us.sentry.io/4509837908639744",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  environment: process.env.NODE_ENV || 'development',
  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') console.log('Sentry event:', event);
    return event;
  }
});

console.log('✅ Sentry initialized successfully');

// ======================
// Start Server
// ======================
const startServer = async () => {
  try {
    console.log('Attempting to connect to database...');
    await connectDB();
    console.log('✅ Database Connected Successfully');

    const app = express();

    // Sentry request handler
    if (Sentry.Handlers?.requestHandler) {
      app.use(Sentry.Handlers.requestHandler());
    } else if (Sentry.requestHandler) {
      app.use(Sentry.requestHandler());
    }

    // Middlewares
    app.use(cors());

    app.post('/webhook/clerk', express.raw({ type: 'application/json' }), ClerkWebhook);

    // All other routes use JSON parser
    app.use(express.json());

    // ======================
    // Routes
    // ======================
    app.get('/', (req, res) => res.send('Job Portal API is running!'));
    app.use('/api/users', userRoutes);

    // Example error route
    app.get('/test-error', (req, res, next) => {
      next(new Error('Sentry test error!'));
    });

    // 404 handler
    app.use((req, res, next) => {
      res.status(404).json({ success: false, error: 'Route not found' });
    });

    // Sentry error handler
    if (Sentry.Handlers?.errorHandler) {
      app.use(Sentry.Handlers.errorHandler());
    } else if (Sentry.errorHandler) {
      app.use(Sentry.errorHandler());
    }

    // Generic error handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
    });

    // Listen
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📌 API endpoints available at:`);
      console.log(`  GET    http://localhost:${PORT}/api/users`);
      console.log(`  POST   http://localhost:${PORT}/api/users`);
      console.log(`  POST   http://localhost:${PORT}/webhook/clerk`);
    });

  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
