// config/instrument.js
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { mongooseIntegration } from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  sendDefaultPii: true,
  integrations: [
    nodeProfilingIntegration(),
    mongooseIntegration()
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

if (process.env.ENABLE_PROFILER === 'true') {
  Sentry.profiler.startProfiler();
}

Sentry.startSpan({ name: "App Startup Span" }, () => {
  console.log("✅ Sentry instrumentation ready");
});

 export default Sentry
