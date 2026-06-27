import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { reportError } from './utils/sentry.mts';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MG_API_KEY || 'key-yourkeyhere',
});

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
    await reportError(err, 'mail');

    return new Response('Mailing error', { status: 500 });
  }
};
