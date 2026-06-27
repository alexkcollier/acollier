import * as Sentry from '@sentry/node';

Sentry.init({ dsn: process.env.SENTRY_DSN });

export async function reportError(err: Error | string | unknown, source: string): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${source}]`, err);
    return;
  }

  Sentry.withScope((scope) => {
    scope.setTag('function', source);

    if (typeof err === 'string') {
      Sentry.captureMessage(err);
    } else if (err instanceof Error) {
      Sentry.captureException(err);
    } else {
      Sentry.captureException(new Error(String(err)));
    }
  });

  await Sentry.flush();
}
