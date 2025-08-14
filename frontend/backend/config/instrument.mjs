import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Initialize Sentry BEFORE any other imports
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://33d2cc89429421ca58fb565ea623877a@o4509837899595776.ingest.us.sentry.io/4509837908639744",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  profilesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  environment: process.env.NODE_ENV || "development",
  beforeSend(event) {
    if (process.env.NODE_ENV === "development") {
      console.log("Sentry event:", event);
    }
    return event;
  }
});

console.log("Sentry initialized successfully");