import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import clerkWebhooks from './controllers/webhhoks.js';




const app = express();
const PORT = process.env.PORT || 5050;

// ✅ If setupExpressErrorHandler works in your version, keep it.
// If not, use the official handler methods.
Sentry.setupExpressErrorHandler(app);

// Middlewares
app.use(cors());
app.use(express.json());

await connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('✅ Hello from Express!');
});

app.get('/debug-sentry', (req, res) => {
  try {
    throw new Error('This is a test error from Express route');
  } catch (err) {
    Sentry.captureException(err); // send to Sentry
    res.status(500).send('Error captured and sent to Sentry');
  }
});

app.get('/error', () => {
  throw new Error('💥 Sentry test error');
});

app.post('/webhooks', clerkWebhooks);


// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
