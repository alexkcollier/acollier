import * as Sentry from '@sentry/node';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

initSentry();

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MG_API_KEY || 'key-yourkeyhere',
});

let sentryInitialized = false;

/**
 * Initializes sentry
 */
function initSentry() {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  sentryInitialized = true;
}

/**
 * Reports error correctly
 */
async function reportError(err: Error | string) {
  if (process.env.NODE_ENV !== 'production') {
    return console.log(err);
  }

  if (!sentryInitialized) {
    return;
  }

  if (typeof err === 'string') {
    Sentry.captureMessage(err);
  } else {
    Sentry.captureException(err);
  }

  return Sentry.flush();
}

/**
 * Send email
 */
async function sendMail(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!process.env.MG_DOMAIN) {
    throw new Error('No MG domain');
  }

  const body = `
===
Name: ${data.name}
Email: ${data.email}
===

${data.message}
`;

  const { message } = await mg.messages.create(process.env.MG_DOMAIN, {
    from: `acollier.ca <noreply@${process.env.MG_DOMAIN}>`,
    to: process.env.MG_RECIPIENT,
    subject: `New contact form submission from ${process.env.MG_DOMAIN}`,
    text: body,
  });

  return message;
}

export default async (req: Request) => {
  // only accept POST
  if (req.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  // verify request has body, filter honeypot
  const data = await req.json();

  if (!data || data.honeypot !== '') {
    return new Response(null, { status: 400 });
  }

  try {
    // Send mail
    const message = await sendMail(data);

    console.log('that worked');
    return new Response(message || 'Mail sent', { status: 200 });
  } catch (err) {
    // Send errors to Sentry
    await reportError(
      typeof err === 'string' || err instanceof Error
        ? err
        : 'Unknown form error',
    );

    return new Response('Mailing error', { status: 500 });
  }
};
