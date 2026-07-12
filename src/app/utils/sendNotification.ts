import config from '../config';
import logger from './logger';

interface INotificationPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const sendNotification = async (payload: INotificationPayload): Promise<void> => {
  const { name, email, subject, message } = payload;
  const msgSubject = subject || 'No Subject';

  // 1. Resend (Email Notification)
  if (config.resend_api_key && config.notification_email) {
    try {
      logger.info(`Sending email notification via Resend to ${config.notification_email}`);
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.resend_api_key}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>', // Resend default domain
          to: config.notification_email,
          subject: `📩 Portfolio Message from ${name}: ${msgSubject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #4f46e5; margin-top: 0;">New Message Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${msgSubject}</p>
              <p><strong>Message:</strong></p>
              <div style="white-space: pre-wrap; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; color: #334155; font-size: 15px; line-height: 1.5;">${message}</div>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="font-size: 12px; color: #64748b; text-align: center;">Received from portfolio website contact form</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        logger.error(`Resend API returned status ${response.status}`, errorData);
      } else {
        logger.info('Email notification sent successfully via Resend.');
      }
    } catch (error) {
      logger.error('Failed to send email notification via Resend', error);
    }
  } else {
    logger.debug('Resend notification skipped (RESEND_API_KEY or NOTIFICATION_EMAIL not set)');
  }

  // 2. Discord Webhook (Instant Chat Notification)
  if (config.discord_webhook_url) {
    try {
      logger.info('Sending notification to Discord webhook');
      const response = await fetch(config.discord_webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [
            {
              title: `📩 New Message: ${msgSubject}`,
              color: 9133302, // Hex #8B5CF6 -> Decimal 9133302
              fields: [
                { name: 'Sender Name', value: name, inline: true },
                { name: 'Sender Email', value: email, inline: true },
                { name: 'Message', value: message },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!response.ok) {
        logger.error(`Discord webhook returned status ${response.status}`);
      } else {
        logger.info('Discord notification sent successfully.');
      }
    } catch (error) {
      logger.error('Failed to send Discord notification', error);
    }
  } else {
    logger.debug('Discord notification skipped (DISCORD_WEBHOOK_URL not set)');
  }
};
