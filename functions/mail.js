/* eslint-disable @typescript-eslint/no-var-requires */
const FormData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: process.env.MG_API_KEY || 'key-yourkeyhere' });
const Sentry = require('@sentry/node');

const response500 = {
  statusCode: 500,
  body: 'Something went wrong',
};
let sentryInitialized = false;

/**
 * Initializes sentry
 */
function initSentry () {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  sentryInitialized = true;
}

/**
 * Reports error correctly
 * @param {Error|string} err Error
 * @returns {Promise<boolean>|void}
 */
async function reportError (err) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    return console.log(err);
  }

  if (!sentryInitialized) {
    return;
  }

  typeof err === 'string' ? Sentry.captureMessage(err) : Sentry.captureException(err);
  return Sentry.flush();
}

/**
 * Send email
 * @param {{ name: string, email: string, message: string }} data message data
 * @returns {Promise<string>} response message
 */
async function sendMail (data) {
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

initSentry();

/**
 * Netlify Function handler
 * @param event Netlify Function event
 * @param context Netlify Function context
 * @returns {Promise<{ statusCode: Number, body: string }>}
 */
exports.handler = async (event, context) => {
  // Make sure AWS doesn't wait for an empty event loop, as that can break things with Sentry
  context.callbackWaitsForEmptyEventLoop = false;

  // only accept POST
  if (event.httpMethod !== 'POST') {
    return response500;
  }

  // verify request has body, filter honeypot
  const data = JSON.parse(event.body);

  if (!data || data.honeypot !== '') {
    return response500;
  }

  try {
    // Send mail
    const message = await sendMail(data);

    return {
      statusCode: 200,
      body: message,
    };
  } catch (err) {
    // Send errors to Sentry
    await reportError(err);

    return response500;
  }
};
