const FormData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: process.env.MG_API_KEY || 'key-yourkeyhere' });

exports.handler = async (event) => {
  try {
    // only accept POST
    if (event.httpMethod !== 'POST') {
      throw new Error('Invalid request method');
    }

    // verify request has body, filter honeypot
    const data = JSON.parse(event?.body);

    if (!data || data.honeypot !== '') {
      throw new Error('Invalid');
    }

    // send mail
    const { message } = await mg.messages.create(process.env.MG_DOMAIN, {
      from: `acollier.ca <noreply@${process.env.MG_DOMAIN}>`,
      to: process.env.MG_RECIPIENT,
      subject: `New contact form submission from ${process.env.MG_DOMAIN}`,
      text: `
===
Name: ${data.name}
Email: ${data.email}
===

${data.message}
`,
    });

    // update client
    return {
      statusCode: 200,
      body: message,
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(err);
    };

    return {
      statusCode: 500,
      body: err.message || 'Something went wrong',
    };
  }
};
